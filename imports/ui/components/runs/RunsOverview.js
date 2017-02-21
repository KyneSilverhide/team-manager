import React from 'react';
import { Well, Alert } from 'react-bootstrap';
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

const RunsOverview = ({ runs }) => {
  if (runs.length > 0) {
    return <div className="RunsList">
      {runs.map(run => (
        <Well key={run._id}>
          <h3>{run.team.name} - {run.version.name}</h3>

          <div className="timeline-wrapper">
            <HorizontalTimeline index={ getDateIndexAtNow(run.version) } eventsMinDistance={50} values={ getDates(run.version) } />
          </div>
          <h4>Congés légaux : {run.holidays.length}</h4>
          <ul>
          {run.holidays.map(holiday => (
              <li>{holiday.name}</li>
          ))}
          </ul>
          <h4>Congés employés</h4>
          <ul>
          {run.developers.map(developer => (
            <div>
              {/* <img className="dev-avatar" title={`${developer.firstname} ${developer.lastname}`} src={`https://jira.xperthis.be/secure/useravatar?ownerId=${developer.jiraAlias}`}/> */}
              {developer.firstname} {developer.lastname} : {developer.holidays}
            </div>
          ))}
          </ul>
        </Well>
      ))}
    </div>;
  }
  return <Alert bsStyle="warning">Vous n'avez aucun run actif pour l'instant</Alert>;
};

RunsOverview.propTypes = {
  runs: React.PropTypes.array,
};

export default RunsOverview;
