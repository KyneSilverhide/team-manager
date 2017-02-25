import moment from 'moment';
import business from 'moment-business';

const getWorkingDays = (version, pivotDate) => business.weekDays(moment(pivotDate || version.startDate), moment(version.endDate));

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

export { getWorkingDays, getRemainingDays };
