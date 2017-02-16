import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

const Versions = new Mongo.Collection('Versions');
export default Versions;

Versions.allow({
  insert: () => false,
  update: () => false,
  remove: () => false,
});

Versions.deny({
  insert: () => true,
  update: () => true,
  remove: () => true,
});

Versions.schema = new SimpleSchema({
  name: {
    type: String,
    label: 'The name of the team',
  },
  startDate: {
    type: Date,
    label: 'When the version starts',
  },
  endDate: {
    type: Date,
    label: 'When the version ends',
  },
  freezeDate: {
    type: Date,
    label: 'When the code freeze occurs',
  }
});

Versions.attachSchema(Versions.schema);
