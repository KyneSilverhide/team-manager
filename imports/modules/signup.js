import { browserHistory } from 'react-router';
import { Accounts } from 'meteor/accounts-base';
import { Bert } from 'meteor/themeteorchef:bert';
import './validation.js';

let component;

const getUserData = () => ({
  email: document.querySelector('[name="emailAddress"]').value,
  password: document.querySelector('[name="password"]').value,
  profile: {
    name: {
      first: document.querySelector('[name="firstName"]').value,
      last: document.querySelector('[name="lastName"]').value,
    },
  },
});

const signup = () => {
  const user = getUserData();

  Accounts.createUser(user, (error) => {
    if (error) {
      Bert.alert(error.reason, 'danger');
    } else {
      browserHistory.push('/');
      Bert.alert('Welcome!', 'success');
    }
  });
};

const validate = () => {
  $(component.signupForm).validate({
    rules: {
      firstName: {
        required: true,
      },
      lastName: {
        required: true,
      },
      emailAddress: {
        required: true,
        email: true,
      },
      password: {
        required: true,
        minlength: 6,
      },
    },
    messages: {
      firstName: {
        required: 'Le prénom doit être renseigné',
      },
      lastName: {
        required: 'Le nom de famille doit être renseigné',
      },
      emailAddress: {
        required: 'L\'adresse mail est obligatoire',
        email: 'L\'email n\'est pas valide',
      },
      password: {
        required: 'Le mot de passe est obligatoire',
        minlength: 'Le mot de passe doit contneir au moins 6 caractères',
      },
    },
    submitHandler() { signup(); },
  });
};

export default function handleSignup(options) {
  component = options.component;
  validate();
}
