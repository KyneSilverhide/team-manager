/* eslint-disable max-len, no-return-assign */

import React from 'react';
import { browserHistory } from 'react-router';
import { FormGroup, ControlLabel, FormControl, Button } from 'react-bootstrap';
import FontAwesome from 'react-fontawesome';
import teamEditor from './team-editor.js';

const backToList = () => {
  browserHistory.push('/teams');
};

export default class TeamEditor extends React.Component {
  componentDidMount() {
    teamEditor({ component: this });
    setTimeout(() => {
      document.querySelector('[name="name"]').focus();
    }, 0);
  }
  render() {
    const { team } = this.props;
    return (
      <form ref={form => (this.teamEditorForm = form)} onSubmit={event => event.preventDefault()}>
        <FormGroup key={team && team._id}>
          <ControlLabel>Nom</ControlLabel>
          <FormControl type="text" name="name" defaultValue={team && team.name} placeholder="Nom de l'équipe"/>
        </FormGroup>
        <Button onClick={() => backToList()}>
          <FontAwesome name='undo'/> Annuler
        </Button>
        &nbsp;
        <Button type="submit" bsStyle="success">
          <FontAwesome name='floppy-o'/> {team && team._id ? 'Enregistrer' : 'Ajouter'}
        </Button>
      </form>
    );
  }
}

TeamEditor.propTypes = {
  team: React.PropTypes.object,
};
