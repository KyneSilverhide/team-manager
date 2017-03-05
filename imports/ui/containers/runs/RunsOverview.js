import { composeWithTracker } from 'react-komposer';
import { Meteor } from 'meteor/meteor';
import DateHolidays from 'date-holidays';
import moment from 'moment';
import { extendMoment } from 'moment-range';
import business from 'moment-business';
import Runs from '../../../api/runs/run.model.js';
import Versions from '../../../api/versions/version.model.js';
import Teams from '../../../api/teams/team.model.js';
import RunsOverview from '../../components/runs/RunsOverview.js';
import Holidays from '../../../api/holidays/holiday.model.js';
import Loading from '../../components/Loading.js';

const fetchCandidateHolidays = (version) => {
  const holidayFactory = new DateHolidays('BE', 'fr');

  const startYear = version.startDate.getFullYear();
  const endYear = version.endDate.getFullYear();
  const holidaysAtStartYear = holidayFactory.getHolidays(version.startDate.getFullYear());
  let candidateHolidays = holidaysAtStartYear;
  if (startYear !== endYear) {
    const holidaysAtEndYear = holidayFactory.getHolidays(version.endDate.getFullYear());
    candidateHolidays = holidaysAtStartYear.concat(holidaysAtEndYear);
  }
  return candidateHolidays;
};

const fetchPublicWeekDaysHolidaysInVersion = (version) => {
  const candidateHolidays = fetchCandidateHolidays(version);
  const holidays = candidateHolidays.filter((holiday) => {
    const holidayDate = new Date(holiday.date);
    const validHoliday = holiday.type === 'public'
      && holidayDate >= version.startDate
      && holidayDate <= version.freezeDate
      && business.isWeekDay(moment(holidayDate));
    return validHoliday;
  });
  return holidays;
};

const filterDeveloperHolidaysInVersion = (version, devHolidays) => {
  const exMoment = extendMoment(moment);
  const versionRange = exMoment.range(version.startDate, version.freezeDate);

  const devDaysHolidays = [];
  for (const devHoliday of devHolidays) {
    const holidayRange = exMoment.range(devHoliday.startDate, devHoliday.endDate);
    const rangeIntersection = versionRange.intersect(holidayRange);
    if (rangeIntersection != null) {
      for (const candidateDay of rangeIntersection.by('day')) {
        if (business.isWeekDay(moment(candidateDay))) {
          devDaysHolidays.push({
            developerId: devHoliday.developerId,
            halfDay: devHoliday.halfDay,
            date: candidateDay,
          });
        }
      }
    }
  }
  return devDaysHolidays;
};

const composer = (params, onData) => {
  const runSubscription = Meteor.subscribe('runs.my.active.list');
  const teamSubscription = Meteor.subscribe('teams.list');
  const versionSubscription = Meteor.subscribe('versions.list');

  if (runSubscription.ready() && teamSubscription.ready() && versionSubscription.ready()) {
    const runs = Runs.find().fetch();
    for (const run of runs) {
      const developerIds = run.developers.map(developer => developer._id);
      const devHolidaysSubscription = Meteor.subscribe('holidays.developers.list', developerIds, Meteor.settings.public.HOLIDAYS_LIMIT);
      if (devHolidaysSubscription.ready()) {
        const team = Teams.findOne({ _id: run.teamId });
        const version = Versions.findOne({ _id: run.versionId });
        const developerHolidays = Holidays.find().fetch();

        run.version = version;
        run.team = team;
        run.holidays = fetchPublicWeekDaysHolidaysInVersion(version);
        run.devHolidays = filterDeveloperHolidaysInVersion(version, developerHolidays);

        onData(null, { runs });
      }
    }
  }
};

export default composeWithTracker(composer, Loading)(RunsOverview);
