import {SimpleSchema} from 'meteor/aldeed:simple-schema';
import {ValidatedMethod} from 'meteor/mdg:validated-method';
import Developers from './developer.model.js';
import rateLimit from '../../modules/rate-limit.js';

export const upsertDeveloper = new ValidatedMethod({
  name: 'developers.upsert',
  validate: new SimpleSchema({
    _id: {
      type: String,
      optional: true
    },
    firstname: {
      type: String,
      optional: false
    },
    lastname: {
      type: String,
      optional: false
    },
    mail: {
      type: String,
      optional: false
    },
    jiraAlias: {
      type: String,
      optional: false
    },
    teamId: {
      type: String,
      optional: true
    }
  }).validator(),
  run(developer) {
    return Developers.upsert({
      _id: developer._id
    }, {$set: developer});
  }
});

export const removeDeveloper = new ValidatedMethod({
  name: 'developers.remove',
  validate: new SimpleSchema({
    _id: {
      type: String
    }
  }).validator(),
  run({_id}) {
    Developers.remove(_id);
  }
});

rateLimit({
  methods: [
    upsertDeveloper, removeDeveloper
  ],
  limit: 5,
  timeRange: 1000
});
