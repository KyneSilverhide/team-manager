import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import Runs from './run.model.js';
import rateLimit from '../../modules/rate-limit.js';

export const upsertRun = new ValidatedMethod({
  name: 'runs.upsert',
  validate: new SimpleSchema({
    _id: { type: String, optional: true },
    name: { type: String, optional: false },
    teamId: { type: String, optional: false },
    versionId: { type: String, optional: false },
    archived: { type: Boolean, optional: false },
    ownerId: { type: String, optional: false },
    developers: { type: [Object], optional: false },
    'developers.$._id': { type: String, optional: false },
    'developers.$.firstname': { type: String, optional: false },
    'developers.$.lastname': { type: String, optional: false },
    'developers.$.mail': { type: String, optional: false },
    'developers.$.jiraAlias': { type: String, optional: false },
    'developers.$.devRatio': { type: Number, optional: false },
  }).validator(),
  run(run) {
    return Runs.upsert({
      _id: run._id,
    }, { $set: run });
  },
});

export const archiveRun = new ValidatedMethod({
  name: 'runs.archive',
  validate: new SimpleSchema({
    _id: { type: String },
    archived: { type: Boolean },
  }).validator(),
  run({ _id, archived }) {
    Runs.update(_id, {
      $set: { archived },
    });
  },
});

export const removeRun = new ValidatedMethod({
  name: 'runs.remove',
  validate: new SimpleSchema({
    _id: { type: String },
  }).validator(),
  run({ _id }) {
    Runs.remove(_id);
  },
});

rateLimit({
  methods: [
    upsertRun, removeRun, archiveRun,
  ],
  limit: 5,
  timeRange: 1000,
});
