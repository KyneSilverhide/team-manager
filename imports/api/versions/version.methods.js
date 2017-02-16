import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import Versions from './version.model.js';
import rateLimit from '../../modules/rate-limit.js';

export const upsertVersion = new ValidatedMethod({
  name: 'versions.upsert',
  validate: new SimpleSchema({
    _id: { type: String, optional: true },
    name: { type: String, optional: false },
    startDate: { type: Date, optional: false },
    freezeDate: { type: Date, optional: false },
    endDate: { type: Date, optional: false },
  }).validator(),
  run(version) {
    return Versions.upsert({ _id: version._id }, { $set: version });
  },
});

export const removeVersion = new ValidatedMethod({
  name: 'versions.remove',
  validate: new SimpleSchema({
    _id: { type: String },
  }).validator(),
  run({ _id }) {
    Versions.remove(_id);
  },
});

rateLimit({
  methods: [
    upsertVersion,
    removeVersion,
  ],
  limit: 5,
  timeRange: 1000,
});
