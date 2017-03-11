import { Meteor } from 'meteor/meteor';
import { composeWithTracker } from 'react-komposer';
import { ReactiveVar } from 'meteor/reactive-var';
import Runs from '../../../api/runs/run.model.js';
import Versions from '../../../api/versions/version.model.js';
import Teams from '../../../api/teams/team.model.js';
import Developers from '../../../api/developers/developer.model.js';
import EditRun from '../../pages/runs/EditRun.js';
import Loading from '../../components/Loading.js';

const teamId = new ReactiveVar('');

const composer = ({ params }, onData) => {
  const runsSub = Meteor.subscribe('runs.view', params._id);
  const teamsSub = Meteor.subscribe('teams.list');
  const versionsSub = Meteor.subscribe('versions.list');

  const developersSub = Meteor.subscribe('developers.by.team', teamId.get());
  if (runsSub.ready() && teamsSub.ready() && versionsSub.ready() && developersSub.ready()) {
    const run = Runs.findOne();
    const teams = Teams.find().fetch();
    const versions = Versions.find().fetch();
    const developersInTeam = Developers.find({ teamId: teamId.get() }).fetch();
    const developers = teamId.get() === run.teamId ? run.developers : developersInTeam;

    onData(null, { run, versions, teams, developers, teamId });
  }
};

export default composeWithTracker(composer, Loading)(EditRun);
