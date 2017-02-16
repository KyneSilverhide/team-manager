import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import Versions from './version.model';

Meteor.publish('versions.list', () => Versions.find());

Meteor.publish('versions.view', (_id) => {
  check(_id, String);
  return Versions.find(_id);
});
