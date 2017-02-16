import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import Developers from './developer.model';

Meteor.publish('developers.list', function(mailFilter, limit) {
  check(limit, Number);
  check(mailFilter, String);
  return Developers.find({
    'mail': {
      '$regex': '.*' + mailFilter || '.*',
      '$options': 'i'
    }
  }, {
    sort: {
      mail: 1
    },
    limit: limit
  });
});

Meteor.publish('developers.by.team', function(teamId) {
  check(teamId, String);
  return Developers.find({
    'teamId': teamId
  });
});


Meteor.publish('developers.view', (_id) => {
  check(_id, String);
  return Developers.find(_id);
});
