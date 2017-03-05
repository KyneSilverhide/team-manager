import React from 'react';
import { Panel, Alert, Label, Row, Col, OverlayTrigger, Tooltip, Image, Popover, Table, ListGroup, ListGroupItem } from 'react-bootstrap';
import moment from 'moment';
import FontAwesome from 'react-fontawesome';
import HorizontalTimeline from 'react-timeline-view';
import { getWorkingDays, getDevHolidaysCountAfter, getDevelopmentDays } from './working-days-utils';
import DeveloperDevDayRow from './DeveloperDevDayRow.js';
import DeveloperHolidayRow from './DeveloperHolidayRow.js';

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

const developerTooltip = (run, developer) => {
  const devRatio = run.developers.find((dev => dev._id === developer._id)).devRatio;
  return <Tooltip id="developerTooltip">{`${developer.firstname} ${developer.lastname} (${devRatio} %)`}</Tooltip>;
};

const getTotalDevelopmentDays = run => getDevelopmentDays(run, run.version.startDate);
const getRemainingDevelopmentDays = run => getDevelopmentDays(run, new Date());
const getTotalDevHolidays = (run) => {
  let totalDevHolidays = 0;
  for (const developer of run.developers) {
    const devHolidays = getDevHolidaysCountAfter(run.devHolidays, developer, run.version.startDate);
    totalDevHolidays += devHolidays;
  }
  return totalDevHolidays;
};

const prettyDate = date => moment(date).format('DD/MM/YYYY');

const holidaysPopover = run => (
  <Popover id="holidaysPopover" title="Jours de congés légaux">
    <ul>{run.holidays.map(holiday => (
        <li key={holiday.name}><strong>{holiday.name}</strong> : {prettyDate(holiday.date)}</li>
    ))}</ul>
  </Popover>
);

const devDaysPopover = (run, pivotDate) => (
  <Popover id="developmentDaysTooltip" title={`Détails des jours restants à partir du ${prettyDate(pivotDate)}`}>
    <Table striped responsive>
      <thead>
      <tr>
        <th>Développeur</th><th>Jours ouvrables <br /><small>(tous - congés empl. - congés légaux)</small></th><th>Ratio Dev</th><th>Jours Dev</th>
      </tr>
    </thead>
      <tbody>
      {run.developers.map(developer => (
        <DeveloperDevDayRow run={run} developer={developer} pivotDate={pivotDate}/>
      ))}
    </tbody>
    </Table>
  </Popover>);

const devHolidaysPopover = run => (
  <Popover id="devHolidaysTooltip" title={'Détails des congés de l\'équipe'}>
      <Table striped responsive>
        <thead>
        <tr>
          <th>Développeur</th><th>Congés</th>
        </tr>
      </thead>
        <tbody>
        {run.developers.map(developer => (
          <DeveloperHolidayRow run={run} developer={developer}/>
        ))}
      </tbody>
      </Table>
    </Popover>);

const runHeader = run => (
  <h1><Label bsStyle="primary">{run.team.name}</Label> - <Label bsStyle="primary">{run.version.name}</Label>
  {run.developers.map(developer => (
    <div key={developer._id} className="pull-right">
      <OverlayTrigger placement="bottom" overlay={developerTooltip(run, developer)}>
        <Image className="dev-avatars-small" src={`${Meteor.settings.public.JIRA_URL}/secure/useravatar?ownerId=${developer.jiraAlias}`} circle />
      </OverlayTrigger>
    </div>
  ))}
</h1>);

const RunsOverview = ({ runs }) => {
  if (runs.length > 0) {
    return <div className="RunsList">
      {runs.map(run => (
        <div className="run-overview" key={run._id}>
          <Panel bsStyle="info" header={runHeader(run)} footer=" ">
            <Row>
              <Col xs={12} className="vcenter">
                <div className="timeline-wrapper">
                  <HorizontalTimeline index={ getDateIndexAtNow(run.version) } eventsMinDistance={50} values={ getDates(run.version) } />
                </div>
              </Col>
            </Row>

            <ListGroup className="run-counters">
              <ListGroupItem>
                <h2>Nombre de jours <strong>restants</strong> dans la version&nbsp;
                  <OverlayTrigger placement="right" trigger={['hover', 'focus']} overlay={devDaysPopover(run, new Date())}>
                     <Label bsStyle="info">{getRemainingDevelopmentDays(run)} <FontAwesome name='info-circle'/></Label>
                  </OverlayTrigger>
                </h2>
              </ListGroupItem>
              <ListGroupItem>
                <h2>Nombre de jours dans la version&nbsp;
                  <OverlayTrigger placement="right" trigger={['hover', 'focus']} overlay={devDaysPopover(run, run.version.startDate)}>
                     <Label bsStyle="info">{getTotalDevelopmentDays(run)} <FontAwesome name='info-circle'/></Label>
                  </OverlayTrigger>
                </h2>
              </ListGroupItem>
              <ListGroupItem>
                <h3>Jours de congés légaux&nbsp;
                  <OverlayTrigger placement="right" trigger={['hover', 'focus']} overlay={holidaysPopover(run)}>
                     <Label>{run.holidays.length} <FontAwesome name='info-circle'/></Label>
                  </OverlayTrigger>
                  &nbsp;jours <FontAwesome name='times'/> <Label>{run.developers.length}</Label> développeurs =&nbsp;
                  <Label bsStyle="info">{run.developers.length * run.holidays.length}</Label>
               </h3>
              </ListGroupItem>
              <ListGroupItem>
                <h3>Jours de congés de l'équipe&nbsp;
                  <OverlayTrigger placement="right" trigger={['hover', 'focus']} overlay={devHolidaysPopover(run)}>
                     <Label>{getTotalDevHolidays(run)} <FontAwesome name='info-circle'/></Label>
                  </OverlayTrigger>
                  &nbsp;jours
               </h3>
              </ListGroupItem>
              <ListGroupItem>
                <h3>Jours (semaine) dans la version&nbsp;
                    <Label>{getWorkingDays(run.version, run.version.startDate)}</Label> jours <FontAwesome name='times'/>
                    <Label>{run.developers.length}</Label> développeurs =&nbsp;
                    <Label bsStyle="info">{run.developers.length * getWorkingDays(run.version, run.version.startDate)}</Label>
                </h3>
              </ListGroupItem>
            </ListGroup>
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
