import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import Holidays from './holiday.model';

Meteor.publish('holidays.developers.list', (developerIds, limit) => {
  check(limit, Number);
  check(developerIds, Array);
  return Holidays.find({
    developerId: { $in: developerIds },
  }, {
    sort: {
      endDate: -1,
    },
    limit,
  });
});

Meteor.publish('holidays.view', (_id) => {
  check(_id, String);
  return Holidays.find(_id);
});
