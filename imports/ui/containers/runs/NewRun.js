import { Meteor } from 'meteor/meteor';
import { composeWithTracker } from 'react-komposer';
import { ReactiveVar } from 'meteor/reactive-var';
import Versions from '../../../api/versions/version.model.js';
import Teams from '../../../api/teams/team.model.js';
import Developers from '../../../api/developers/developer.model.js';
import NewRun from '../../pages/runs/NewRun.js';
import Loading from '../../components/Loading.js';

const teamId = new ReactiveVar('');

const composer = ({ params }, onData) => {
  const teamsSub = Meteor.subscribe('teams.list');
  const versionsSub = Meteor.subscribe('versions.list');

  const developersSub = Meteor.subscribe('developers.by.team', teamId.get());

  if (teamsSub.ready() && versionsSub.ready() && developersSub.ready()) {
    const teams = Teams.find().fetch();
    const versions = Versions.find().fetch();
    const developers = Developers.find({ teamId: teamId.get() }).fetch();
    onData(null, { versions, teams, developers, teamId });
  }
};

export default composeWithTracker(composer, Loading)(NewRun);
