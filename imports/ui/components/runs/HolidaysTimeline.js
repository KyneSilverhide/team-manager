import React from 'react';
import Timeline from 'react-calendar-timeline';
import moment from 'moment';

export default class HolidaysTimeline extends React.Component {

  getGroups() {
    const { run } = this.props;
    const groups = [];
    groups.push({
      id: 0,
      title: run.version.name,
    });
    for (const developer of run.developers) {
      groups.push({
        id: developer._id,
        title: `${developer.firstname} ${developer.lastname}`,
      });
    }
    groups.push({
      id: -1,
      title: 'Total',
    });
    return groups;
  }

  getVersionDevDateItem(run) {
    return {
      id: 0,
      group: 0,
      title: 'Développement',
      start_time: run.version.startDate,
      end_time: run.version.freezeDate,
      className: 'development',
    };
  }

  getVersionFreezeDateItem(run) {
    return {
      id: 1,
      group: 0,
      title: 'Freeze/Validation',
      start_time: run.version.freezeDate,
      end_time: run.version.endDate,
      className: 'freeze',
    };
  }

  getDevHolidayDateItem(id, devHoliday) {
    return {
      id,
      group: devHoliday.developerId,
      title: devHoliday.halfDay ? '0.5' : '1',
      start_time: devHoliday.date,
      end_time: moment(devHoliday.date).endOf('day'),
      className: devHoliday.halfDay ? 'halfday' : 'fullday',
    };
  }

  getDateItems() {
    const { run } = this.props;
    const dateItems = [];

    dateItems.push(this.getVersionDevDateItem(run));
    dateItems.push(this.getVersionFreezeDateItem(run));

    let count = 2;
    for (const devHoliday of run.devHolidays) {
      dateItems.push(this.getDevHolidayDateItem(count, devHoliday));
      count += 1;
    }
    return dateItems;
  }

  render() {
    const { run } = this.props;
    return <Timeline groups={this.getGroups()} items={this.getDateItems()} canMove={false} canChangeGroup={false} canResize={false}
              itemHeightRatio={1} defaultTimeStart={run.version.startDate}
              defaultTimeEnd={run.version.freezeDate}/>;
  }
}

HolidaysTimeline.propTypes = {
  run: React.PropTypes.object,
};
