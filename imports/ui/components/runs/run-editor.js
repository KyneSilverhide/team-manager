import { Meteor } from 'meteor/meteor';
import { browserHistory } from 'react-router';
import { Bert } from 'meteor/themeteorchef:bert';
import { upsertRun } from '../../../api/runs/run.methods.js';
import '../../../modules/validation.js';

let component;

const buildDevelopers = (componentRefs) => {
  const developers = [];
  for (const [key, ref] of Object.entries(componentRefs)) {
    if (key.startsWith('dev')) {
      const developer = {
        _id: ref.state._id,
        firstname: ref.state.firstname,
        lastname: ref.state.lastname,
        jiraAlias: ref.state.jiraAlias,
        mail: ref.state.mail,
        devRatio: Number(ref.state.devRatio),
      };
      developers.push(developer);
    }
  }
  return developers;
};

const handleUpsert = () => {
  const { run } = component.props;
  const developers = buildDevelopers(component.refs);
  const versionName = $('[name="versionId"').find(':selected').text().trim();
  const teamName = $('[name="teamId"').find(':selected').text().trim();
  const confirmation = run && run._id
    ? 'Run mis à jour'
    : 'Run ajouté';
  const upsert = {
    teamId: $('[name="teamId"]').val().trim(),
    versionId: $('[name="versionId"]').val().trim(),
    archived: false,
    name: `${versionName} ${teamName}`,
    ownerId: Meteor.userId(),
    developers,
  };

  if (run && run._id) {
    upsert._id = run._id;
  }

  upsertRun.call(upsert, (error) => {
    if (error) {
      Bert.alert(error.reason, 'danger');
    } else {
      component.runEditorForm.reset();
      Bert.alert(confirmation, 'success');
      browserHistory.push('/runs');
    }
  });
};

const validate = () => {
  $(component.runEditorForm).validate({
    rules: {
      teamId: {
        required: true,
      },
      versionId: {
        required: true,
      },
    },
    messages: {
      teamId: {
        required: 'L\'équipe est obligatoire',
      },
      versionId: {
        required: 'La version est obligatoire',
      },
    },
    submitHandler() {
      handleUpsert();
    },
  });
};

export default function runEditor(options) {
  component = options.component;
  validate();
}
