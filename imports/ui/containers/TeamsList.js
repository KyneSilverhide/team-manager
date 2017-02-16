import { composeWithTracker } from 'react-komposer';
import { Meteor } from 'meteor/meteor';
import Teams from '../../api/teams/team.model.js';
import TeamsList from '../components/TeamsList.js';
import Loading from '../components/Loading.js';

const composer = (params, onData) => {
  const subscription = Meteor.subscribe('teams.list');

  if (subscription.ready()) {
    const teams = Teams.find().fetch();
    onData(null, { teams });
  }
};

export default composeWithTracker(composer, Loading)(TeamsList);
