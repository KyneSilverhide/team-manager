import React from 'react';
import moment from 'moment';
import { Label } from 'react-bootstrap';
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
            <Label bsStyle={holiday.halfDay ? 'default' : 'info'} className="developer-holiday" key={holiday.date}>
              {this.prettyDate(holiday.date)}
            </Label>
        ))}</td>
      </tr>
    );
  }
}

DeveloperHolidayRow.propTypes = {
  run: React.PropTypes.object,
  developer: React.PropTypes.object,
};
