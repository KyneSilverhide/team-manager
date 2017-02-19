import React from 'react';
import { browserHistory } from 'react-router';
import { ListGroup, ListGroupItem, Alert } from 'react-bootstrap';
import { Bert } from 'meteor/themeteorchef:bert';
import { removeTeam } from '../../api/teams/team.methods.js';
import { sortByName } from '../../modules/sorting.js';

const handleEdit = (_id) => {
  browserHistory.push(`/teams/${_id}/edit`);
};

const handleRemove = (_id) => {
  if (confirm('Etes-vous sûr de vouloir supprimer cette équipe?')) {
    removeTeam.call({
      _id,
    }, (error) => {
      if (error) {
        Bert.alert(error.reason, 'danger');
      } else {
        Bert.alert('Equipe supprimée', 'success');
        browserHistory.push('/teams');
      }
    });
  }
};

const TeamsList = ({ teams }) => (teams.length > 0
  ? <ListGroup className="TeamsList">
      {teams.sort(sortByName).map(({ _id, name }) => (
        <ListGroupItem key={_id}>
          {name}
          <span className="pull-right">
            <span className="btn btn-default list-actions" onClick={() => handleEdit(_id)}>Editer</span>
            &nbsp;
            <span className="btn btn-danger list-actions" onClick={() => handleRemove(_id)}>Supprimer</span>
          </span>
        </ListGroupItem>
      ))}
    </ListGroup>
  : <Alert bsStyle="warning">Il n'y a aucune équipe pour l'instant</Alert>);

TeamsList.propTypes = {
  teams: React.PropTypes.array,
};

export default TeamsList;
