import { Meteor } from 'meteor/meteor';
import { composeWithTracker } from 'react-komposer';
import Developer from '../../../api/developers/developer.model.js';
import NewHoliday from '../../pages/holidays/NewHoliday.js';
import Loading from '../../components/Loading.js';

const composer = ({ params }, onData) => {
  const subscription = Meteor.subscribe('developers.view', params.developerId);
  if (subscription.ready()) {
    const developer = Developer.findOne();
    onData(null, { developer });
  }
};

export default composeWithTracker(composer, Loading)(NewHoliday);
