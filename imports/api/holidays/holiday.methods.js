import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import Holidays from './holiday.model.js';
import rateLimit from '../../modules/rate-limit.js';

export const upsertHoliday = new ValidatedMethod({
  name: 'holidays.upsert',
  validate: new SimpleSchema({
    _id: {
      type: String,
      optional: true,
    },
    developerId: {
      type: String,
      optional: false,
    },
    startDate: {
      type: Date,
      optional: false,
    },
    endDate: {
      type: Date,
      optional: false,
    },
    halfDay: {
      type: Boolean,
      optional: false,
    },
  }).validator(),
  run(holidays) {
    return Holidays.upsert({
      _id: holidays._id,
    }, { $set: holidays });
  },
});

export const removeHoliday = new ValidatedMethod({
  name: 'holidayss.remove',
  validate: new SimpleSchema({
    _id: {
      type: String,
    },
  }).validator(),
  run({ _id }) {
    Holidays.remove(_id);
  },
});

rateLimit({
  methods: [
    upsertHoliday, removeHoliday,
  ],
  limit: 5,
  timeRange: 1000,
});
