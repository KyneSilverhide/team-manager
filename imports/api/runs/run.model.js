import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

const Runs = new Mongo.Collection('Runs');
export default Runs;

Runs.allow({
  insert: () => false,
  update: () => false,
  remove: () => false,
});

Runs.deny({
  insert: () => true,
  update: () => true,
  remove: () => true,
});

Runs.schema = new SimpleSchema({
  name: {
    type: String,
    label: 'The name of this run',
  },
  teamId: {
    type: String,
    label: 'The _id of the team in this run',
  },
  versionId: {
    type: String,
    label: 'The _id of the version in this run',
  },
  developers: {
    type: [Object],
    label: 'List of developers in this run',
  },
  'developers.$._id': {
    type: String,
    label: 'The _id of the developer in this run',
  },
  'developers.$.firstname': {
    type: String,
    label: 'The firstname of the developer in this run',
  },
  'developers.$.lastname': {
    type: String,
    label: 'The lastname of the developer in this run',
  },
  'developers.$.devRatio': {
    type: Number,
    label: 'Define the percentage of time this developer will work on stories',
  },
  'developers.$.holidays': {
    type: Number,
    label: 'Count the holidays of this developer in this run',
  },
  ownerId: {
    type: String,
    label: 'The _id of user that created this run',
  },
  archived: {
    type: Boolean,
    label: 'Set this run as archived or not',
  },
});

Runs.attachSchema(Runs.schema);
