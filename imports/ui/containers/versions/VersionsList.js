import { composeWithTracker } from 'react-komposer';
import { Meteor } from 'meteor/meteor';
import Versions from '../../../api/versions/version.model.js';
import VersionsList from '../../components/versions/VersionsList.js';
import Loading from '../../components/Loading.js';

const composer = (params, onData) => {
  const subscription = Meteor.subscribe('versions.list');

  if (subscription.ready()) {
    const versions = Versions.find().fetch();

    onData(null, { versions });
  }
};

export default composeWithTracker(composer, Loading)(VersionsList);
