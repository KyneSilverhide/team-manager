import moment from 'moment';
import business from 'moment-business';

const getValidPivotDate = (version, pivotDate) => {
  if (!pivotDate || pivotDate < version.startDate) {
    return version.startDate;
  }
  return pivotDate;
};

const getWorkingDays = (version, pivotDate) => {
  const validPivotDate = getValidPivotDate(version, pivotDate);
  return Math.max(0, business.weekDays(moment(validPivotDate), moment(version.freezeDate)));
};

const getHolidaysAfter = (holidays, startDate) => {
  const filteredHolidays = holidays.filter((holiday) => {
    const holidayDate = new Date(holiday.date);
    return holidayDate >= startDate;
  });
  return filteredHolidays;
};

const isAfterOrSame = (holiday, pivotDate) => holiday.date.isAfter(pivotDate) || holiday.date.isSame(pivotDate, 'day');

const getDevHolidaysCountAfter = (devHolidays, developer, pivotDate) => {
  let totalDevHolidays = 0;
  for (const devHoliday of devHolidays) {
    if (devHoliday.developerId === developer._id && isAfterOrSame(devHoliday, pivotDate)) {
      totalDevHolidays += (devHoliday.halfDay ? 0.5 : 1);
    }
  }
  return totalDevHolidays;
};

const getDevHolidaysAfter = (devHolidays, developer, pivotDate) => devHolidays.filter(holiday =>
  holiday.developerId === developer._id && isAfterOrSame(holiday, pivotDate));

const getRemainingDays = (run, developer, workingDays, pivotDate) => {
  const holidays = getHolidaysAfter(run.holidays, pivotDate || run.version.startDate);
  const developerHolidaysCount = getDevHolidaysCountAfter(run.devHolidays, developer, pivotDate);
  return Math.max(workingDays - developerHolidaysCount - holidays.length, 0);
};

const getDevelopmentDays = (run, pivotDate) => {
  let totalDevelopmentDays = 0;
  const workingDays = getWorkingDays(run.version, pivotDate);
  for (const developer of run.developers) {
    const remaingDays = getRemainingDays(run, developer, workingDays, pivotDate);
    const developmentDays = (remaingDays * (developer.devRatio / 100).toFixed(2));
    totalDevelopmentDays += developmentDays;
  }
  return Math.floor(totalDevelopmentDays);
};


export { getWorkingDays, getHolidaysAfter, getDevHolidaysCountAfter, getDevHolidaysAfter,
  getRemainingDays, getDevelopmentDays };
