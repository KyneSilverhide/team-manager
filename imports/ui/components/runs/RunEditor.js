import React from 'react';
import { browserHistory } from 'react-router';
import { Session } from 'meteor/session';
import { FormGroup, ControlLabel, FormControl, Button, Table } from 'react-bootstrap';
import FontAwesome from 'react-fontawesome';
import DeveloperAssociation from './DeveloperAssociation.js';
import runEditor from '../../../modules/run-editor.js';
import { sortByName } from '../../../modules/sorting.js';

const backToList = () => {
  browserHistory.push('/runs');
};

const loadDevelopersByTeam = () => {
  Session.set('run-team-id', $('[name=teamId]').val());
};


export default class RunEditor extends React.Component {

  constructor(props) {
    super(props);
    Session.set('run-team-id', null);
  }

  componentDidMount() {
    runEditor({ component: this });
    loadDevelopersByTeam();
  }

  render() {
    const { run, versions, teams, developers } = this.props;
    return (
      <form ref={form => (this.runEditorForm = form)} onSubmit={event => event.preventDefault()}>
        <FormGroup>
          <ControlLabel>Version</ControlLabel>
          <FormControl componentClass="select" name="versionId" defaultValue={run && run.versionId}>
            {versions.sort(sortByName).map(({ _id, name }) => (
              <option key={_id} value={_id}>{name}</option>
            ))}
          </FormControl>
        </FormGroup>
        <FormGroup>
          <ControlLabel>Equipe</ControlLabel>
          <FormControl componentClass="select" name="teamId" defaultValue={run && run.teamId} onChange={() => loadDevelopersByTeam()}>
            {teams.sort(sortByName).map(({ _id, name }) => (
              <option key={_id} value={_id}>{name}</option>
            ))}
          </FormControl>
        </FormGroup>
        <Table responsive>
          <thead>
            <tr>
              <th>Développeur</th>
              <th>Jour(s) de congés</th>
              <th>Ratio de développement</th>
            </tr>
          </thead>
          <tbody>
            {developers.sort(sortByName).map(developer => (
              <DeveloperAssociation key={developer._id} developer={developer} ref={`dev-${developer._id}`}/>
            ))}
          </tbody>
        </Table>
        <Button onClick={() => backToList()}>
          <FontAwesome name='undo'/> Annuler
        </Button>
        &nbsp;
        <Button type="submit" bsStyle="success">
          <FontAwesome name='floppy-o'/> {run && run._id ? 'Enregistrer' : 'Ajouter'}
        </Button>
      </form>
    );
  }
}

RunEditor.propTypes = {
  run: React.PropTypes.object,
  versions: React.PropTypes.array,
  teams: React.PropTypes.array,
  developers: React.PropTypes.array,
};
