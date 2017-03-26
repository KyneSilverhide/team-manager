import { Accounts } from 'meteor/accounts-base';
import { Bert } from 'meteor/themeteorchef:bert';
import './validation.js';

let component;

const handleRecovery = () => {
  Accounts.forgotPassword({
    email: document.querySelector('[name="emailAddress"]').value,
  }, (error) => {
    if (error) {
      Bert.alert(error.reason, 'warning');
    } else {
      Bert.alert('Un mail de récupération de mot de passe a été envoyé', 'success');
    }
  });
};

const validate = () => {
  $(component.recoverPasswordForm).validate({
    rules: {
      emailAddress: {
        required: true,
        email: true,
      },
    },
    messages: {
      emailAddress: {
        required: 'Veuillez entrer votre email',
        email: 'Cet email est invalide',
      },
    },
    submitHandler() { handleRecovery(); },
  });
};

export default function handleRecoverPassword(options) {
  component = options.component;
  validate();
}
