import React from 'react';
import { Panel, Alert, Label, Row, Col, OverlayTrigger, Tooltip, Image, Popover, Table } from 'react-bootstrap';
import moment from 'moment';
import business from 'moment-business';
import HorizontalTimeline from 'react-timeline-view';

const getDates = (version) => {
  const unsortedDates = [
    { date: version.startDate, title: 'Début' },
    { date: version.freezeDate, title: 'Code freeze' },
    { date: version.endDate, title: 'Fin' },
    { date: new Date(), title: 'Aujourd\'hui' },
  ];
  return unsortedDates.sort((date1, date2) => new Date(date1.date) - new Date(date2.date));
};

const getDateIndexAtNow = (version) => {
  const now = new Date();
  const start = new Date(version.startDate);
  const freeze = new Date(version.freezeDate);
  const end = new Date(version.endDate);
  if (now < start) {
    return 0;
  } else if (now < freeze) {
    return 1;
  } else if (now < end) {
    return 2;
  }
  return 3;
};

const developerTooltip = developer => (
  <Tooltip id="developerTooltip">{`${developer.firstname} ${developer.lastname}`}</Tooltip>
);

const holidaysPopover = run => (
  <Popover id="holidaysPopover" title="Jours de congés légaux">
    <ul>{run.holidays.map(holiday => (
        <li key={holiday.name}><strong>{holiday.name}</strong> : {moment(holiday.date).format('DD/MM/YYYY')}</li>
    ))}</ul>
  </Popover>
);

const getWorkingDays = version => business.weekDays(moment(version.startDate), moment(version.endDate));

const getDevelopmentDays = (run) => {
  let totalDevelopmentDays = 0;
  const workingDays = getWorkingDays(run.version);
  for (const developer of run.developers) {
    const remaingDays = Math.max(workingDays - developer.holidays, 0);
    const developmentDays = remaingDays * (developer.devRatio / 100);
    totalDevelopmentDays += developmentDays;
  }
  return totalDevelopmentDays;
};

const remainingTooltip = () => <Tooltip id="totalTooltip">Jours restants</Tooltip>;

const renderDeveloperDevDayTooltip = (run, developer) => {
  const workingDays = getWorkingDays(run.version);
  const remaingDays = Math.max(workingDays - developer.holidays, 0);
  return (
    <tr key={developer._id}>
      <th>{`${developer.firstname} ${developer.lastname}`}</th>
      <th>{remaingDays}</th>
      <th>{developer.devRatio}</th>
      <th><strong>{remaingDays * (developer.devRatio / 100)}</strong></th>
    </tr>
  );
};

const developmentDaysTooltip = run => (
  <Popover id="developmentDaysTooltip" title="Ratio de développement X jours de développement">
    <Table striped condensed hover responsive>
      <tr>
        <th>Développeur</th>
        <th>Jours présents</th>
        <th>Ratio Dev</th>
        <th>Jours Dev</th>
      </tr>
      {run.developers.map(developer => (
        renderDeveloperDevDayTooltip(run, developer)
      ))}
    </Table>
  </Popover>
);

const runHeader = run => (
  <h1><Label bsStyle="primary">{run.team.name}</Label> - <Label bsStyle="primary">{run.version.name}</Label>
  {run.developers.map(developer => (
    <div key={developer._id} className="pull-right">
      <OverlayTrigger placement="bottom" overlay={developerTooltip(developer)}>
        <Image className="dev-avatars-small" src={`https://jira.xperthis.be/secure/useravatar?ownerId=${developer.jiraAlias}`} circle />
      </OverlayTrigger>
    </div>
  ))}
</h1>);

const RunsOverview = ({ runs }) => {
  if (runs.length > 0) {
    return <div className="RunsList">
      {runs.map(run => (
        <div className="run-overview" key={run._id}>
          <Panel header={runHeader(run)} footer=" ">
            <Row>
              <Col xs={12} className="vcenter">
                <div className="timeline-wrapper">
                  <HorizontalTimeline index={ getDateIndexAtNow(run.version) } eventsMinDistance={50} values={ getDates(run.version) } />
                </div>
              </Col>
            </Row>

            <Row className="clearfix">
              <Col xs={12}>
                <h2>Nombre de jours <strong>restants</strong> dans la version&nbsp;
                  <OverlayTrigger placement="bottom" overlay={remainingTooltip()}>
                    <Label bsStyle="info">??</Label>
                  </OverlayTrigger>
                </h2>
                <h2>Nombre de jours dans la version&nbsp;
                  <OverlayTrigger placement="bottom" overlay={developmentDaysTooltip(run)}>
                     <Label bsStyle="info">{getDevelopmentDays(run)}</Label>
                  </OverlayTrigger>
                </h2>
              </Col>
            </Row>
            <Row className="clearfix">
              <Col xs={12}>
                <h4>Jours de congés légaux&nbsp;
                  <OverlayTrigger placement="bottom" trigger={['hover', 'focus']} overlay={holidaysPopover(run)}>
                    <Label>{run.holidays.length}</Label>
                  </OverlayTrigger>
                </h4>
                <h4>Jours (semaine) dans la version&nbsp;
                    <Label>{getWorkingDays(run.version)}</Label> jours X <Label>{run.developers.length}</Label> développeurs =
                    <Label bsStyle="info">{run.developers.length * getWorkingDays(run.version)}</Label>
                </h4>
              </Col>
            </Row>
          </Panel>
        </div>
      ))}
    </div>;
  }
  return <Alert bsStyle="warning">Vous n'avez aucun run actif pour l'instant</Alert>;
};

RunsOverview.propTypes = {
  runs: React.PropTypes.array,
};

export default RunsOverview;
