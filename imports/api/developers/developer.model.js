import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

const Developers = new Mongo.Collection('Developers');
export default Developers;

Developers.allow({
  insert: () => false,
  update: () => false,
  remove: () => false,
});

Developers.deny({
  insert: () => true,
  update: () => true,
  remove: () => true,
});

Developers.schema = new SimpleSchema({
  firstname: {
    type: String,
    label: 'The firstname of the developer',
  },
  lastname: {
    type: String,
    label: 'The lastname of the developer',
  },
  mail: {
    type: String,
    label: 'The developer email',
  },
  jiraAlias: {
    type: String,
    label: 'The jira login of the developer',
  },
  teamId: {
    type: String,
    optional: true,
    label: 'The _id of the developer\'s team',
  },
});

Developers.attachSchema(Developers.schema);
