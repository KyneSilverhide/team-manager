import { composeWithTracker } from 'react-komposer';
import { Meteor } from 'meteor/meteor';
import Developers from '../../../api/developers/developer.model.js';
import Holidays from '../../../api/holidays/holiday.model.js';
import HolidaysList from '../../pages/holidays/Holidays.js';
import Loading from '../../components/Loading.js';

const composer = ({ params }, onData) => {
  if (params.developerId) {
    const devSub = Meteor.subscribe('developers.view', params.developerId);
    const holidaySub = Meteor.subscribe('holidays.developers.list', [params.developerId], 50);

    if (devSub.ready() && holidaySub.ready()) {
      const holidays = Holidays.find().fetch();
      const developer = Developers.findOne();

      onData(null, { developer, holidays });
    }
  } else {
    onData(null, {});
  }
};

export default composeWithTracker(composer, Loading)(HolidaysList);
