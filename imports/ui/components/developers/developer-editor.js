/* eslint-disable no-undef */

import { browserHistory } from 'react-router';
import { Bert } from 'meteor/themeteorchef:bert';
import { upsertDeveloper } from '../../../api/developers/developer.methods.js';
import '../../../modules/validation.js';

let component;

const handleUpsert = () => {
  const { developer } = component.props;
  const confirmation = developer && developer._id
    ? 'Développeur mis à jour'
    : 'Développeur ajouté';
  const upsert = {
    firstname: document.querySelector('[name="firstname"]').value.trim(),
    lastname: document.querySelector('[name="lastname"]').value.trim(),
    mail: document.querySelector('[name="mail"]').value.trim(),
    jiraAlias: document.querySelector('[name="jiraAlias"]').value.trim(),
    teamId: document.querySelector('[name="teamId"]').value.trim(),
  };

  if (developer && developer._id) {
    upsert._id = developer._id;
  }

  upsertDeveloper.call(upsert, (error) => {
    if (error) {
      Bert.alert(error.reason, 'danger');
    } else {
      component.developerEditorForm.reset();
      Bert.alert(confirmation, 'success');
      browserHistory.push('/developers');
    }
  });
};

const validate = () => {
  $(component.developerEditorForm).validate({
    rules: {
      firstname: {
        required: true,
      },
      lastname: {
        required: true,
      },
      mail: {
        required: true,
      },
      jiraAlias: {
        required: true,
      },
      teamId: {
        required: false,
      },
    },
    messages: {
      firstname: {
        required: 'Le prénom est obligatoire',
      },
      lastname: {
        required: 'Le nom de famille est obligatoire',
      },
      mail: {
        required: 'L\'email est obligatoire',
      },
      jiraAlias: {
        required: 'Le login JIRA est obligatoire',
      },
    },
    submitHandler() {
      handleUpsert();
    },
  });
};

export default function developerEditor(options) {
  component = options.component;
  validate();
}
