import { Meteor } from 'meteor/meteor';
import { composeWithTracker } from 'react-komposer';
import Holiday from '../../../api/holidays/holiday.model.js';
import Developer from '../../../api/developers/developer.model.js';
import EditHoliday from '../../pages/holidays/EditHoliday.js';
import Loading from '../../components/Loading.js';

const composer = ({ params }, onData) => {
  const holidaySubscription = Meteor.subscribe('holidays.view', params._id);
  if (holidaySubscription.ready()) {
    const holiday = Holiday.findOne();
    const devSubscription = Meteor.subscribe('developers.view', holiday.developerId);

    if (devSubscription.ready()) {
      const developer = Developer.findOne();
      onData(null, { developer, holiday });
    }
  }
};

export default composeWithTracker(composer, Loading)(EditHoliday);
