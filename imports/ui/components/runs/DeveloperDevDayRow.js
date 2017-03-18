import React from 'react';
import { getWorkingDays, getHolidaysAfter, getDevHolidaysCountAfter, getRemainingDays } from './working-days-utils';

export default class DeveloperDevDayRow extends React.Component {

  render() {
    const { run, developer, pivotDate } = this.props;

    const workingDays = getWorkingDays(run.version, pivotDate);
    const remaingDays = getRemainingDays(run, developer, workingDays, pivotDate);
    const holidays = getHolidaysAfter(run.holidays, pivotDate);
    const devHolidays = getDevHolidaysCountAfter(run.devHolidays, developer, pivotDate);
    return (
      <tr key={developer._id}>
        <td>{`${developer.firstname} ${developer.lastname}`}</td>
        <td>{remaingDays} ({workingDays} - {devHolidays} - {holidays.length})</td>
        <td>{developer.devRatio} %</td>
        <td><strong>{(remaingDays * (developer.devRatio / 100).toFixed(2))}</strong></td>
      </tr>
    );
  }
}

DeveloperDevDayRow.propTypes = {
  run: React.PropTypes.object,
  developer: React.PropTypes.object,
  pivotDate: React.PropTypes.instanceOf(Date),
};
