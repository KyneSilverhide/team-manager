import { Meteor } from 'meteor/meteor';
import { composeWithTracker } from 'react-komposer';
import Teams from '../../../api/teams/team.model.js';
import NewDeveloper from '../../pages/developers/NewDeveloper.js';
import Loading from '../../components/Loading.js';

const composer = ({ params }, onData) => {
  const teamsSub = Meteor.subscribe('teams.list');

  if (teamsSub.ready()) {
    const teams = Teams.find().fetch();

    onData(null, { teams });
  }
};

export default composeWithTracker(composer, Loading)(NewDeveloper);
