import { browserHistory } from 'react-router';
import { Bert } from 'meteor/themeteorchef:bert';
import { upsertHoliday } from '../../../api/holidays/holiday.methods.js';
import '../../../modules/validation.js';

let component;

const handleUpsert = () => {
  const { holiday } = component.props;
  const confirmation = holiday && holiday._id
    ? 'Congé mis à jour'
    : 'Congé ajouté';
  const upsert = {
    developerId: $('[name="developerId"]').val(),
    startDate: $('[name="startDate"]').data('DateTimePicker').date().toDate(),
    endDate: $('[name="endDate"]').data('DateTimePicker').date().toDate(),
    halfDay: $('[name="halfDay"]').prop('checked'),
  };

  if (holiday && holiday._id) {
    upsert._id = holiday._id;
  }

  upsertHoliday.call(upsert, (error) => {
    if (error) {
      Bert.alert(error.reason, 'danger');
    } else {
      component.holidayEditorForm.reset();
      Bert.alert(confirmation, 'success');
      browserHistory.push(`/holidays/${upsert.developerId}`);
    }
  });
};

const validate = () => {
  $(component.holidayEditorForm).validate({
    rules: {
      developerId: {
        required: true,
      },
      startDate: {
        required: true,
      },
      endDate: {
        required: true,
      },
    },
    messages: {
      developerId: {
        required: 'Un congé doit être lié à un développeur',
      },
      startDate: {
        required: 'Le congé doit avoir une date de début',
      },
      endDate: {
        required: 'Le congé doit avoir une date de fin',
      },
    },
    submitHandler() {
      handleUpsert();
    },
  });
};

export default function holidayEditor(options) {
  component = options.component;
  validate();
}
