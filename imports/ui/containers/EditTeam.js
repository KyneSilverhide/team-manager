import { Meteor } from 'meteor/meteor';
import { composeWithTracker } from 'react-komposer';
import Teams from '../../api/teams/team.model.js';
import EditTeam from '../pages/EditTeam.js';
import Loading from '../components/Loading.js';

const composer = ({ params }, onData) => {
  const subscription = Meteor.subscribe('teams.view', params._id);

  if (subscription.ready()) {
    const team = Teams.findOne();
    onData(null, { team });
  }
};

export default composeWithTracker(composer, Loading)(EditTeam);
