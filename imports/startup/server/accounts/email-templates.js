import { Accounts } from 'meteor/accounts-base';

const name = 'Xperthis Team-Manager';
const email = '<aurelien.lansmanne@xperthis.be>';
const from = `${name} ${email}`;
const emailTemplates = Accounts.emailTemplates;

emailTemplates.siteName = name;
emailTemplates.from = from;

emailTemplates.resetPassword = {
  subject() {
    return `[${name}] Récupération du mot de passe`;
  },
  text(user, url) {
    const userEmail = user.emails[0].address;
    const urlWithoutHash = url.replace('#/', '');

    return `Une demande de réinitialisation du mot de passe a été reçue pour cet email (${userEmail}). Pour changer de mot de passe, cliquez sur l'URL suivante:
    \n\n${urlWithoutHash}\n\n Si vous n'êtes pas l'auteur de cette demande, ignorez cet email.
    Si vous avez l'impression que quelquechose d'anormal s'est produit, contactez le responsable de la plateforme: ${email}.`;
  },
};
