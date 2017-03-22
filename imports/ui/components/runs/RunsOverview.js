import React from 'react';
import { Panel, Alert, Label, Row, Col, OverlayTrigger, Tooltip, Image, Popover, Table, Well } from 'react-bootstrap';
import moment from 'moment';
import FontAwesome from 'react-fontawesome';
import { getWorkingDays, getDevHolidaysCountAfter, getDevelopmentDays } from './working-days-utils';
import DeveloperDevDayRow from './DeveloperDevDayRow.js';
import DeveloperHolidayRow from './DeveloperHolidayRow.js';
import HolidaysTimeline from './HolidaysTimeline.js';

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
        <DeveloperDevDayRow key={developer._id} run={run} developer={developer} pivotDate={pivotDate}/>
      ))}
    </tbody>
    </Table>
  </Popover>);

const devHolidaysPopover = run => (
  <Popover id="devHolidaysTooltip" title={'Détails des congés de l\'équipe'}>
      <Table striped responsive>
        <thead>
          <tr>
            <th>Développeur</th><th>Congés <Label bsStyle="info">Jour</Label>&nbsp;<Label bsStyle="default">Demi-Jour</Label></th>
          </tr>
        </thead>
        <tbody>
        {run.developers.map(developer => (
          <DeveloperHolidayRow key={developer._id} run={run} developer={developer}/>
        ))}
      </tbody>
      </Table>
    </Popover>
  );

const runHeader = run => (
  <h1>
    <Label bsStyle="primary">{run.team.name}</Label> - <Label bsStyle="primary">{run.version.name}</Label>
    <span className="hidden-xs">
      {run.developers.map(developer => (
        <div key={developer._id} className="pull-right">
          <OverlayTrigger placement="bottom" overlay={developerTooltip(run, developer)}>
            <Image className="dev-avatars-small" src={`${Meteor.settings.public.JIRA_URL}/secure/useravatar?ownerId=${developer.jiraAlias}`} circle />
          </OverlayTrigger>
        </div>
      ))}
    </span>
  </h1>
);

export default class RunsOverview extends React.Component {

  render() {
    const { runs } = this.props;
    if (runs.length > 0) {
      return <div className="RunsList">
      {runs.map(run => (
        <div className="run-overview" key={run._id}>
          <Panel bsStyle="info" header={runHeader(run)} footer=" ">
            <Row>
              <Col xs={12} xsHidden={true}>
                <Well>
                  <div className="hidden-xs">
                    <HolidaysTimeline key={run._id} run={run}/>
                  </div>
                </Well>
              </Col>
            </Row>
            <div className="run-counters">
              <Row clearfix>
                <Col xs={12} sm={6} md={4}>
                  <Well>
                    <Row>
                      <Col xs={2} className="icon-column">
                        <FontAwesome className="pull-left box-icon" name="calendar"/>
                      </Col>
                      <Col xs={10} className="vcenter">
                        <Row>
                          <span className="box-label">Nombre de jours <strong>restants</strong> dans la version</span>
                        </Row>
                        <Row>
                          <Col xs={12}>
                            <OverlayTrigger placement="right" trigger={['hover', 'focus']} overlay={devDaysPopover(run, new Date())}>
                               <span>
                                 <h1 className="box-data">{getRemainingDevelopmentDays(run)}</h1>
                                 {/* <FontAwesome className="hidden-xs info-tooltip" name="info-circle"/> */}
                               </span>
                            </OverlayTrigger>
                          </Col>
                        </Row>
                      </Col>
                    </Row>
                  </Well>
                </Col>
                <Col xs={12} sm={6} md={4}>
                  <Well>
                    <Row>
                      <Col xs={2} className="icon-column">
                        <FontAwesome className="pull-left box-icon" name="calendar"/>
                      </Col>
                      <Col xs={10} className="vcenter">
                        <Row>
                          <Col xs={12}><span className="box-label">Nombre de jours dans la version</span></Col>
                        </Row>
                        <Row>
                          <Col xs={12}>
                            <OverlayTrigger placement="left" trigger={['hover', 'focus']} overlay={devDaysPopover(run, run.version.startDate)}>
                              <span>
                                <h1 className="box-data">{getTotalDevelopmentDays(run)}</h1>
                                {/* <FontAwesome className="hidden-xs info-tooltip" name="info-circle"/> */}
                              </span>
                            </OverlayTrigger>
                          </Col>
                        </Row>
                      </Col>
                    </Row>
                  </Well>
                </Col>
                <Col xs={12} sm={6} md={4}>
                  <Well>
                    <Row>
                      <Col xs={2} className="icon-column">
                        <FontAwesome className="pull-left box-icon" name="sun-o"/>
                      </Col>
                      <Col xs={10} className="vcenter">
                        <Row>
                          <Col xs={12}><span className="box-label">Jours de congés légaux</span></Col>
                        </Row>
                        <Row>
                          <Col xs={4}>
                            <OverlayTrigger placement="right" trigger={['hover', 'focus']} overlay={holidaysPopover(run)}>
                               <span>
                                 <h1 className="box-data">{run.developers.length * run.holidays.length}</h1>
                                 {/* <FontAwesome className="hidden-xs info-tooltip" name="info-circle"/> */}
                               </span>
                            </OverlayTrigger>
                          </Col>
                          <Col xs={8} className="box-details">
                            {run.holidays.length} <span className="xs">jours</span><br />
                            {run.developers.length} <span className="xs">développeurs</span>
                          </Col>
                        </Row>
                      </Col>
                    </Row>
                  </Well>
                </Col>
                <Col xs={12} sm={6} md={4}>
                  <Well>
                    <Row>
                      <Col xs={2} className="icon-column">
                        <FontAwesome className="pull-left box-icon" name="sun-o"/>
                      </Col>
                      <Col xs={10} className="vcenter">
                        <Row>
                          <Col xs={12}><span className="box-label">Jours de congés de l'équipe</span></Col>
                        </Row>
                        <Row>
                          <Col xs={12}>
                            <OverlayTrigger placement="left" trigger={['hover', 'focus']} overlay={devHolidaysPopover(run)}>
                               <span>
                                 <h1 className="box-data">{getTotalDevHolidays(run)}</h1>
                                 {/* <FontAwesome className="hidden-xs info-tooltip" name="info-circle"/> */}
                               </span>
                            </OverlayTrigger>
                          </Col>
                        </Row>
                      </Col>
                    </Row>
                  </Well>
                </Col>
                <Col xs={12} sm={6} md={4}>
                  <Well>
                    <Row>
                      <Col xs={2} className="icon-column">
                        <FontAwesome className="pull-left box-icon" name="calendar"/>
                      </Col>
                      <Col xs={10} className="vcenter">
                        <Row>
                          <Col xs={12}><span className="box-label">Jours (semaine) dans la version</span></Col>
                        </Row>
                        <Row>
                          <Col xs={4}>
                            <h1 className="box-data">
                              {run.developers.length * getWorkingDays(run.version, run.version.startDate)}
                            </h1>
                          </Col>
                          <Col xs={8} className="box-details">
                            {getWorkingDays(run.version, run.version.startDate)} <span className="xs">jours</span><br />
                            {run.developers.length} <span className="xs">développeurs</span>
                          </Col>
                        </Row>
                      </Col>
                    </Row>
                  </Well>
                </Col>
              </Row>
            </div>
          </Panel>
        </div>
      ))}
    </div>;
    }
    return <Alert bsStyle="warning">Vous n'avez aucun run actif pour l'instant</Alert>;
  }
}

RunsOverview.propTypes = {
  runs: React.PropTypes.array,
};
