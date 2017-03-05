import React from 'react';
import moment from 'moment';
import { getDevHolidaysAfter } from './working-days-utils';

export default class DeveloperHolidayRow extends React.Component {

  prettyDate(date) {
    return moment(date).format('DD/MM/YYYY');
  }

  render() {
    const { run, developer } = this.props;
    const developerHolidays = getDevHolidaysAfter(run.devHolidays, developer, run.version.startDate);
    return (
      <tr key={developer._id}>
        <td>{`${developer.firstname} ${developer.lastname}`}</td>
        <td>{developerHolidays.map(holiday => (
            <li className="developer-holiday" key={holiday.date}>{this.prettyDate(holiday.date)}</li>
        ))}</td>
      </tr>
    );
  }
}

DeveloperHolidayRow.propTypes = {
  run: React.PropTypes.object,
  developer: React.PropTypes.object,
};
