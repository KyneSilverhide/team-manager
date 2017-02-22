import { composeWithTracker } from 'react-komposer';
import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';
import Developers from '../../../api/developers/developer.model.js';
import DevelopersList from '../../components/developers/DevelopersList.js';
import Loading from '../../components/Loading.js';

const composer = (params, onData) => {
  const limit = Session.get('dev-limit') || 6;
  const mailFilter = Session.get('dev-search-mail') || '';
  const subscription = Meteor.subscribe('developers.list', mailFilter, limit);

  if (subscription.ready()) {
    const developers = Developers.find().fetch();
    onData(null, { developers });
  }
};

export default composeWithTracker(composer, Loading)(DevelopersList);
