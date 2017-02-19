import React from 'react';
import { FormGroup, ControlLabel, FormControl, Button } from 'react-bootstrap';
import { browserHistory } from 'react-router';
import { remove as removeDiacritics } from 'diacritics';
import developerEditor from '../../modules/developer-editor.js';
import { sortByName } from '../../modules/sorting.js';

const backToList = () => {
  browserHistory.push('/developers');
};

const updateMailAndJira = () => {
  const firstname = $('[name="firstname"]').val();
  const lastname = $('[name="lastname"]').val();
  if (firstname && lastname) {
    const lowerFirstName = removeDiacritics(firstname.toLowerCase());
    const lowerLastName = removeDiacritics(lastname.toLowerCase());
    const expectedMail = `${lowerFirstName}.${lowerLastName}@xperthis.be`;
    const expectedJira = lowerFirstName.substring(0, 2) + lowerLastName.substring(0, 6);
    $('[name="mail"]').val(expectedMail);
    $('[name="jiraAlias"]').val(expectedJira);
  }
};

export default class DeveloperEditor extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      devRatio: 0,
    };
  }

  componentDidMount() {
    developerEditor({ component: this });
    setTimeout(() => {
      document.querySelector('[name="firstname"]').focus();
    }, 0);
    const { developer } = this.props;
    this.setState({ devRatio: (developer && developer.devRatio) || 0 });
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ devRatio: nextProps.developer.devRatio || 0 });
  }


  updateDevRatio(value) {
    this.setState({ devRatio: value });
  }

  render() {
    const { developer, teams } = this.props;
    return (
      <form style={{ position: 'relative' }} key={developer && developer._id} ref={form => (this.developerEditorForm = form)} onSubmit={event => event.preventDefault()}>
        <FormGroup>
          <ControlLabel>Prénom</ControlLabel>
          <FormControl type="text" name="firstname" defaultValue={developer && developer.firstname} onKeyUp={() => updateMailAndJira()} placeholder="Prénom du développeur"/>
        </FormGroup>
        <FormGroup>
          <ControlLabel>Nom</ControlLabel>
          <FormControl type="text" name="lastname" defaultValue={developer && developer.lastname} onKeyUp={() => updateMailAndJira()} placeholder="Nom de famille du développeur"/>
        </FormGroup>
        <FormGroup>
          <ControlLabel>Mail</ControlLabel>
          <FormControl type="text" name="mail" defaultValue={developer && developer.mail} placeholder="Mail de société"/>
        </FormGroup>
        <FormGroup>
          <ControlLabel>JIRA</ControlLabel>
          <FormControl type="text" name="jiraAlias" defaultValue={developer && developer.jiraAlias} placeholder="Login JIRA"/>
        </FormGroup>
        <FormGroup>
          <ControlLabel>Equipe</ControlLabel>
          <FormControl componentClass="select" name="teamId" defaultValue={developer && developer.teamId}>
            {teams.sort(sortByName).map(({ _id, name }) => (
              <option key={_id} value={_id}>{name}</option>
            ))}
          </FormControl>
        </FormGroup>
        <Button onClick={() => backToList()}>
          Annuler
        </Button>
        &nbsp;
        <Button type="submit" bsStyle="success">
          {developer && developer._id
            ? 'Enregistrer'
            : 'Ajouter'}
        </Button>
      </form>
    );
  }
}

DeveloperEditor.propTypes = {
  developer: React.PropTypes.object,
  teams: React.PropTypes.array,
};
