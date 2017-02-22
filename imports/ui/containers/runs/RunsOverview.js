import { composeWithTracker } from 'react-komposer';
import { Meteor } from 'meteor/meteor';
import Holidays from 'date-holidays';
import Runs from '../../../api/runs/run.model.js';
import Versions from '../../../api/versions/version.model.js';
import Teams from '../../../api/teams/team.model.js';
import RunsOverview from '../../components/runs/RunsOverview.js';
import Loading from '../../components/Loading.js';

const composer = (params, onData) => {
  const runSub = Meteor.subscribe('runs.my.active.list');
  const teamSub = Meteor.subscribe('teams.list');
  const versionSub = Meteor.subscribe('versions.list');

  const holidayFactory = new Holidays('BE', 'fr');

  if (runSub.ready() && teamSub.ready() && versionSub.ready()) {
    const runs = Runs.find().fetch();
    for (const run of runs) {
      const team = Teams.findOne({ _id: run.teamId });
      const version = Versions.findOne({ _id: run.versionId });

      const holidaysAtStartYear = holidayFactory.getHolidays(version.startDate.getFullYear());
      const holidaysAtEndYear = holidayFactory.getHolidays(version.endDate.getFullYear());
      const candidateHolidays = holidaysAtStartYear.concat(holidaysAtEndYear);
      const holidays = candidateHolidays.filter((holiday) => {
        const holidayDate = new Date(holiday.date);
        return holiday.type === 'public'
        && holidayDate >= version.startDate
        && holidayDate <= version.endDate;
      });

      run.team = team;
      run.version = version;
      run.holidays = holidays;
    }
    onData(null, { runs });
  }
};

export default composeWithTracker(composer, Loading)(RunsOverview);
