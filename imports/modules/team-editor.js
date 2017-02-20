/* eslint-disable no-undef */

import { browserHistory } from 'react-router';
import { Bert } from 'meteor/themeteorchef:bert';
import { upsertTeam } from '../api/teams/team.methods.js';
import './validation.js';

let component;

const handleUpsert = () => {
  const { team } = component.props;
  const confirmation = team && team._id
    ? 'Equipe mise à jour'
    : 'Equipe ajoutée';
  const upsert = {
    name: document.querySelector('[name="name"]').value.trim(),
  };

  if (team && team._id) {
    upsert._id = team._id;
  }

  upsertTeam.call(upsert, (error) => {
    if (error) {
      Bert.alert(error.reason, 'danger');
    } else {
      component.teamEditorForm.reset();
      Bert.alert(confirmation, 'success');
      browserHistory.push('/teams');
    }
  });
};

const validate = () => {
  $(component.teamEditorForm).validate({
    rules: {
      name: {
        required: true,
      },
    },
    messages: {
      name: {
        required: 'Le nom est obligatoire',
      },
    },
    submitHandler() {
      handleUpsert();
    },
  });
};

export default function teamEditor(options) {
  component = options.component;
  validate();
}
