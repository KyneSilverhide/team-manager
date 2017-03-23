import React from 'react';
import Timeline from 'react-calendar-timeline';
import moment from 'moment';
import 'moment/locale/fr';
import { extendMoment } from 'moment-range';

export default class HolidaysTimeline extends React.Component {

  constructor(props) {
    super(props);
    moment.locale('fr');
  }

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

  getVersionDevelopmentPeriod(run) {
    return {
      id: 'version_period',
      group: 0,
      title: 'Développement',
      start_time: run.version.startDate,
      end_time: run.version.freezeDate,
      className: 'version',
    };
  }

  getVersionFreezePeriod(run) {
    return {
      id: 'freeze_period',
      group: 0,
      title: 'Freeze/Validation',
      start_time: run.version.freezeDate,
      end_time: run.version.endDate,
      className: 'freeze',
    };
  }

  getLegalHolidayDateItem(developer, holiday) {
    const id = `holiday_${developer._id}_${holiday.date}`;
    return {
      id,
      group: developer._id,
      title: holiday.name,
      start_time: moment(holiday.date),
      end_time: moment(holiday.date).endOf('day'),
      className: 'holiday',
    };
  }

  getHolidayDateItem(developer, devHoliday) {
    const id = `devholiday_${developer._id}_${devHoliday.date}`;
    return {
      id,
      group: devHoliday.developerId,
      title: devHoliday.halfDay ? developer.devRatio / 200 : 0,
      start_time: devHoliday.date,
      end_time: moment(devHoliday.date).endOf('day'),
      className: devHoliday.halfDay ? 'halfday' : 'fullday',
    };
  }

  getDevDateItem(developer, day) {
    const id = `devdate_${developer._id}_${day}`;
    return {
      id,
      group: developer._id,
      title: developer.devRatio / 100,
      start_time: day,
      end_time: moment(day).endOf('day'),
      className: 'development',
    };
  }

  findHoliday(day) {
    const { run } = this.props;
    for (const holiday of run.holidays) {
      if (moment(holiday.date).isSame(day, 'day')) {
        return holiday;
      }
    }
    return null;
  }

  findDevHoliday(day, developer) {
    const { run } = this.props;
    for (const devHoliday of run.devHolidays) {
      if (devHoliday.developerId === developer._id && devHoliday.date.isSame(day, 'day')) {
        return devHoliday;
      }
    }
    return null;
  }

  buildTimelineItemAt(developer, day) {
    const legalHoliday = this.findHoliday(day);
    if (legalHoliday != null) {
      return this.getLegalHolidayDateItem(developer, legalHoliday);
    }
    const devHoliday = this.findDevHoliday(day, developer);
    if (devHoliday != null) {
      return this.getHolidayDateItem(developer, devHoliday);
    }
    return this.getDevDateItem(developer, day);
  }

  buildWeekItemBetween(startOfWeek, endOfWeek, actualDevDays, totalDevDays) {
    return {
      id: `week_${startOfWeek}`,
      group: -1,
      title: `${actualDevDays} jours (${totalDevDays})`,
      start_time: startOfWeek,
      end_time: endOfWeek,
      className: 'total-week',
    };
  }

  isNumeric(num) {
    return !isNaN(num);
  }

  getDateItems() {
    const exMoment = extendMoment(moment);
    const { run } = this.props;
    const dateItems = [];

    dateItems.push(this.getVersionDevelopmentPeriod(run));
    dateItems.push(this.getVersionFreezePeriod(run));

    const versionRange = exMoment.range(run.version.startDate, moment(run.version.freezeDate));
    for (const firstWeekDay of versionRange.by('week')) {
      const monday = moment(firstWeekDay).startOf('week');
      const friday = moment(monday).add(4, 'day').endOf('day');

      const startOfWeek = moment(monday).isAfter(run.version.startDate) ? moment(monday) : moment(run.version.startDate);
      const endOfWeek = moment(friday).isAfter(run.version.freezeDate) ? moment(run.version.freezeDate).subtract(1, 'day').endOf('day') : moment(friday);

      const weekRange = exMoment.range(startOfWeek, endOfWeek);
      let actualDevDays = 0;
      let totalDevDays = 0;
      for (const day of weekRange.by('day')) {
        for (const developer of run.developers) {
          const timelineDay = this.buildTimelineItemAt(developer, day);
          if (this.isNumeric(timelineDay.title)) {
            actualDevDays += Number(timelineDay.title);
            totalDevDays += 1;
          }
          dateItems.push(timelineDay);
        }
      }

      dateItems.push(this.buildWeekItemBetween(startOfWeek, endOfWeek, actualDevDays, totalDevDays));
    }
    return dateItems;
  }

  render() {
    const { run } = this.props;
    return <Timeline groups={this.getGroups()} items={this.getDateItems()} canMove={false} canChangeGroup={false} canResize={false}
              itemHeightRatio={1} defaultTimeStart={moment().startOf('week')}
              defaultTimeEnd={moment(run.version.startDate).add(2, 'week')}/>;
  }
}

HolidaysTimeline.propTypes = {
  run: React.PropTypes.object,
};
