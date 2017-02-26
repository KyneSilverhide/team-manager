import { Meteor } from 'meteor/meteor';
import { composeWithTracker } from 'react-komposer';
import { Session } from 'meteor/session';
import Versions from '../../../api/versions/version.model.js';
import Teams from '../../../api/teams/team.model.js';
import Developers from '../../../api/developers/developer.model.js';
import NewRun from '../../pages/runs/NewRun.js';
import Loading from '../../components/Loading.js';

const composer = ({ params }, onData) => {
  const teamsSub = Meteor.subscribe('teams.list');
  const versionsSub = Meteor.subscribe('versions.list');

  const teamId = Session.get('run-team-id') || '';
  const developersSub = Meteor.subscribe('developers.by.team', teamId);

  if (teamsSub.ready() && versionsSub.ready() && developersSub.ready()) {
    const teams = Teams.find().fetch();
    const versions = Versions.find().fetch();
    const developers = Developers.find({ teamId }).fetch();
    onData(null, { versions, teams, developers });
  }
};

export default composeWithTracker(composer, Loading)(NewRun);
