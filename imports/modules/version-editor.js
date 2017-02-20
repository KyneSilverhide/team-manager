/* eslint-disable no-undef */

import { browserHistory } from 'react-router';
import { Bert } from 'meteor/themeteorchef:bert';
import { upsertVersion } from '../api/versions/version.methods.js';
import './validation.js';

let component;

const handleUpsert = () => {
  const { version } = component.props;
  const confirmation = version && version._id
    ? 'Version mise à jour'
    : 'Version ajoutée';
  const upsert = {
    name: document.querySelector('[name="name"]').value.trim(),
    startDate: $('[name="startDate"]').data('DateTimePicker').date().toDate(),
    freezeDate: $('[name="freezeDate"]').data('DateTimePicker').date().toDate(),
    endDate: $('[name="endDate"]').data('DateTimePicker').date().toDate(),
  };

  if (version && version._id) {
    upsert._id = version._id;
  }

  upsertVersion.call(upsert, (error) => {
    if (error) {
      Bert.alert(error.reason, 'danger');
    } else {
      component.versionEditorForm.reset();
      Bert.alert(confirmation, 'success');
      browserHistory.push('/versions');
    }
  });
};

const validate = () => {
  $(component.versionEditorForm).validate({
    rules: {
      name: {
        required: true,
      },
      startDate: {
        required: true,
      },
      freezeDate: {
        required: true,
      },
      endDate: {
        required: true,
      },
    },
    messages: {
      name: {
        required: 'Le nom est obligatoire',
      },
      startDate: {
        required: 'La version doit avoir une date de début',
      },
      freezeDate: {
        required: 'La date de code freeze doit être renseignée',
      },
      endDate: {
        required: 'La version doit avoir une date de fin',
      },
    },
    submitHandler() {
      handleUpsert();
    },
  });
};

export default function versionEditor(options) {
  component = options.component;
  validate();
}
