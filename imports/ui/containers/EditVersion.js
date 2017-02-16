import { Meteor } from 'meteor/meteor';
import { composeWithTracker } from 'react-komposer';
import Versions from '../../api/versions/version.model.js';
import EditVersion from '../pages/EditVersion.js';
import Loading from '../components/Loading.js';

const composer = ({ params }, onData) => {
  const subscription = Meteor.subscribe('versions.view', params._id);

  if (subscription.ready()) {
    const version = Versions.findOne();
    onData(null, { version });
  }
};

export default composeWithTracker(composer, Loading)(EditVersion);
