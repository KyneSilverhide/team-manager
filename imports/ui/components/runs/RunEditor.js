import React from 'react';
import { browserHistory } from 'react-router';
import { Session } from 'meteor/session';
import { FormGroup, ControlLabel, FormControl, Button, Table, Alert } from 'react-bootstrap';
import FontAwesome from 'react-fontawesome';
import { Bert } from 'meteor/themeteorchef:bert';
import DeveloperAssociation from './DeveloperAssociation.js';
import runEditor from './run-editor.js';
import { sortByName } from '../../../modules/sorting.js';
import SelectDeveloper from '../developers/SelectDeveloper.js';

const backToList = () => {
  browserHistory.push('/runs');
};


export default class RunEditor extends React.Component {

  constructor(props) {
    super(props);
    Session.set('run-team-id', null);
    this.state = { developers: [] };
  }

  loadDevelopersByTeam() {
    Session.set('run-team-id', $('[name=teamId]').val());
  }

  componentDidMount() {
    runEditor({ component: this });
    this.loadDevelopersByTeam();
    const { developers } = this.props;
    this.setState({ developers });
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ developers: nextProps.developers });
  }

  addDeveloperToRun(developer) {
    const developers = this.state.developers.slice();
    let found = false;
    for (const currDev of developers) {
      if (currDev._id === developer._id) {
        found = true;
      }
    }
    if (found) {
      Bert.alert('Ce développeur est déjà dans ce run', 'info');
    } else {
      developers.push(developer);
      this.setState({ developers });
    }
  }

  renderDeveloperSelection() {
    return <SelectDeveloper onChoose={this.addDeveloperToRun.bind(this)} label="Ajouter développeur(s)" icon="user-plus" open={false}/>;
  }

  render() {
    const { run, versions, teams } = this.props;
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
          <FormControl componentClass="select" name="teamId" defaultValue={run && run.teamId} onChange={() => this.loadDevelopersByTeam()}>
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
            {this.state.developers.sort(sortByName).map(developer => (
              <DeveloperAssociation key={developer._id} developer={developer} ref={`dev-${developer._id}`}/>
            ))}
            <tr>
              <td>{run ? <Alert bsStyle="info">Il n'est pas possible d'ajouter des développeurs en cours de Run</Alert> : this.renderDeveloperSelection()}</td>
            </tr>
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
