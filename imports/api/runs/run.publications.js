import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import Runs from './run.model';

Meteor.publish('runs.my.list', function publishAllMyRuns() {
  if (this.userId) {
    return Runs.find({
      ownerId: this.userId,
    });
  }
  return this.ready();
});

Meteor.publish('runs.my.active.list', function publishMyActiveRuns() {
  if (this.userId) {
    return Runs.find({
      ownerId: this.userId,
      archived: false,
    });
  }
  return this.ready();
});

Meteor.publish('runs.view', (_id) => {
  check(_id, String);
  return Runs.find(_id);
});
