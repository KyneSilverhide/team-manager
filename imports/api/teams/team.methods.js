import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import Teams from './team.model.js';
import rateLimit from '../../modules/rate-limit.js';

export const upsertTeam = new ValidatedMethod({
  name: 'teams.upsert',
  validate: new SimpleSchema({
    _id: { type: String, optional: true },
    name: { type: String, optional: true },
  }).validator(),
  run(team) {
    return Teams.upsert({ _id: team._id }, { $set: team });
  },
});

export const removeTeam = new ValidatedMethod({
  name: 'teams.remove',
  validate: new SimpleSchema({
    _id: { type: String },
  }).validator(),
  run({ _id }) {
    Teams.remove(_id);
  },
});

rateLimit({
  methods: [
    upsertTeam,
    removeTeam,
  ],
  limit: 5,
  timeRange: 1000,
});
