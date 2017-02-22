import { composeWithTracker } from 'react-komposer';
import { Meteor } from 'meteor/meteor';
import Runs from '../../../api/runs/run.model.js';
import RunsList from '../../components/runs/RunsList.js';
import Loading from '../../components/Loading.js';

const composer = (params, onData) => {
  const subscription = Meteor.subscribe('runs.my.list');

  if (subscription.ready()) {
    const runs = Runs.find().fetch();

    onData(null, { runs });
  }
};

export default composeWithTracker(composer, Loading)(RunsList);
