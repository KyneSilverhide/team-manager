import { Meteor } from 'meteor/meteor';
import { composeWithTracker } from 'react-komposer';
import Developers from '../../../api/developers/developer.model.js';
import Teams from '../../../api/teams/team.model.js';
import EditDeveloper from '../../pages/developers/EditDeveloper.js';
import Loading from '../../components/Loading.js';

const composer = ({ params }, onData) => {
  const developersSub = Meteor.subscribe('developers.view', params._id);
  const teamsSub = Meteor.subscribe('teams.list');

  if (developersSub.ready() && teamsSub.ready()) {
    const developer = Developers.findOne();
    const teams = Teams.find().fetch();

    onData(null, { developer, teams });
  }
};

export default composeWithTracker(composer, Loading)(EditDeveloper);
