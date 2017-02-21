import React from 'react';
import { browserHistory } from 'react-router';
import { ListGroup, ListGroupItem, Alert } from 'react-bootstrap';
import Confirm from 'react-confirm-bootstrap';
import { Bert } from 'meteor/themeteorchef:bert';
import { removeTeam } from '../../../api/teams/team.methods.js';
import { sortByName } from '../../../modules/sorting.js';

const handleEdit = (_id) => {
  browserHistory.push(`/teams/${_id}/edit`);
};

const handleRemove = (_id) => {
  removeTeam.call({ _id }, (error) => {
    if (error) {
      Bert.alert(error.reason, 'danger');
    } else {
      Bert.alert('Equipe supprimée', 'success');
      browserHistory.push('/teams');
    }
  });
};

const TeamsList = ({ teams }) => (teams.length > 0
  ? <ListGroup className="TeamsList">
      {teams.sort(sortByName).map(({ _id, name }) => (
        <ListGroupItem key={_id} className='clearfix'>
          {name}
          <span className="pull-right">
            <button className="btn btn-sm btn-default" onClick={() => handleEdit(_id)}>Editer</button>
            &nbsp;
            <Confirm
              onConfirm={() => handleRemove(_id)}
              body="Etes-vous sur de vouloir supprimer cette équipe?"
              confirmText="Supprimer" cancelText="Annuler" title="Suppression">
              <button className="btn btn-sm btn-danger">Supprimer</button>
            </Confirm>
          </span>
        </ListGroupItem>
      ))}
    </ListGroup>
  : <Alert bsStyle="warning">Il n'y a aucune équipe pour l'instant</Alert>);

TeamsList.propTypes = {
  teams: React.PropTypes.array,
};

export default TeamsList;
