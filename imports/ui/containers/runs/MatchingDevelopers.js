import { composeWithTracker } from 'react-komposer';
import { Meteor } from 'meteor/meteor';
import Developers from '../../../api/developers/developer.model.js';
import MatchingDevelopers from '../../components/runs/MatchingDevelopers.js';
import Loading from '../../components/Loading.js';

const composer = (params, onData) => {
  const subscription = Meteor.subscribe('developers.list', params.mailFilter, 5);

  if (subscription.ready()) {
    const matchingDevelopers = Developers.find({ mail: {
      $regex: `.*${params.mailFilter}` || '.*',
      $options: 'i',
    } }).fetch();
    onData(null, { matchingDevelopers, onChoose: params.onChoose });
  }
};

export default composeWithTracker(composer, Loading)(MatchingDevelopers);
