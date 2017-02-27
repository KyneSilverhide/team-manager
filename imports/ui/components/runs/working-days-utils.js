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
  return business.weekDays(moment(validPivotDate), moment(version.freezeDate));
};

const getHolidaysAfter = (holidays, startDate) => {
  const filteredHolidays = holidays.filter((holiday) => {
    const holidayDate = new Date(holiday.date);
    return holidayDate >= startDate;
  });
  return filteredHolidays;
};

const getRemainingDays = (run, developer, workingDays, pivotDate) => {
  const holidays = getHolidaysAfter(run.holidays, pivotDate || run.version.startDate);
  return Math.max(workingDays - developer.holidays - holidays.length, 0);
};

const getDevelopmentDays = (run, pivotDate) => {
  let totalDevelopmentDays = 0;
  const workingDays = getWorkingDays(run.version, pivotDate);
  for (const developer of run.developers) {
    const remaingDays = getRemainingDays(run, developer, workingDays, pivotDate);
    const developmentDays = Math.floor(remaingDays * (developer.devRatio / 100));
    totalDevelopmentDays += developmentDays;
  }
  return totalDevelopmentDays;
};


export { getWorkingDays, getHolidaysAfter, getRemainingDays, getDevelopmentDays };
