import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

const Teams = new Mongo.Collection('Teams');
export default Teams;

Teams.allow({
  insert: () => false,
  update: () => false,
  remove: () => false,
});

Teams.deny({
  insert: () => true,
  update: () => true,
  remove: () => true,
});

Teams.schema = new SimpleSchema({
  name: {
    type: String,
    label: 'The name of the team',
  },
});

Teams.attachSchema(Teams.schema);
