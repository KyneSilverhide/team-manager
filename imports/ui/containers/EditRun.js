import { Meteor } from 'meteor/meteor';
import { composeWithTracker } from 'react-komposer';
import { Session } from 'meteor/session';
import Runs from '../../api/runs/run.model.js';
import Versions from '../../api/versions/version.model.js';
import Teams from '../../api/teams/team.model.js';
import Developers from '../../api/developers/developer.model.js';
import EditRun from '../pages/EditRun.js';
import Loading from '../components/Loading.js';

const composer = ({ params }, onData) => {
  const runsSub = Meteor.subscribe('runs.view', params._id);
  const teamsSub = Meteor.subscribe('teams.list');
  const versionsSub = Meteor.subscribe('versions.list');

  const teamId = Session.get('run-team-id') || '';
  const developersSub = Meteor.subscribe('developers.by.team', teamId);

  if (runsSub.ready() && teamsSub.ready() && versionsSub.ready() && developersSub.ready()) {
    const run = Runs.findOne();
    const teams = Teams.find().fetch();
    const versions = Versions.find().fetch();
    const developersInTeam = Developers.find().fetch();
    const developers = teamId === run.teamId ? run.developers : developersInTeam;
    onData(null, { run, versions, teams, developers });
  }
};

export default composeWithTracker(composer, Loading)(EditRun);
