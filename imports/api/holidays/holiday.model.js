import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

const Holidays = new Mongo.Collection('Holidays');
export default Holidays;

Holidays.allow({
  insert: () => false,
  update: () => false,
  remove: () => false,
});

Holidays.deny({
  insert: () => true,
  update: () => true,
  remove: () => true,
});

Holidays.schema = new SimpleSchema({
  developerId: {
    type: String,
    label: 'The id of the developer on holidays',
  },
  startDate: {
    type: Date,
    label: 'The first day of the holiday',
  },
  endDate: {
    type: Date,
    label: 'The last day of the holiday',
  },
  halfDay: {
    type: Boolean,
    label: 'If the holiday is only half (a) day(s)',
  },
});

Holidays.attachSchema(Holidays.schema);
