import React from 'react';
import { browserHistory } from 'react-router';
import { ListGroup, ListGroupItem, Alert } from 'react-bootstrap';
import Confirm from 'react-confirm-bootstrap';
import { Bert } from 'meteor/themeteorchef:bert';
import { archiveRun, removeRun } from '../../api/runs/run.methods.js';
import { sortByName } from '../../modules/sorting.js';

const handleEdit = (_id) => {
  browserHistory.push(`/runs/${_id}/edit`);
};

const handleArchive = (_id, archived) => {
  archiveRun.call({ _id, archived: !archived }, (error) => {
    if (error) {
      Bert.alert(error.reason, 'danger');
    } else {
      Bert.alert(`Run ${archived
        ? 'Désarchivé'
        : 'Archivé'}`, 'success');
      browserHistory.push('/runs');
    }
  });
};

const handleRemove = (_id) => {
  removeRun.call({
    _id,
  }, (error) => {
    if (error) {
      Bert.alert(error.reason, 'danger');
    } else {
      Bert.alert('Run supprimé', 'success');
      browserHistory.push('/runs');
    }
  });
};

const renderEditButton = (run) => {
  if (run.archived) {
    return '';
  }
  return <button className="btn btn-sm btn-default" onClick={() => handleEdit(run._id)}>Editer</button>;
};

const renderArchiveButton = (run) => {
  if (run.archived) {
    return <button className="btn btn-sm btn-default" onClick={() => handleArchive(run._id, true)}>Désarchiver</button>;
  }
  return <button className="btn btn-sm btn-info" onClick={() => handleArchive(run._id, false)}>Archiver</button>;
};

const renderDeleteButton = (run) => {
  if (run.archived) {
    return <Confirm
      onConfirm={() => handleRemove(run._id)}
      body="Etes-vous sur de vouloir supprimer définitivement ce run? Cette opération ne peut être annulée."
      confirmText="Supprimer"
      cancelText="Annuler"
      title="Suppression">
      <button className="btn btn-sm btn-danger">Supprimer</button>
    </Confirm>;
  }
  return '';
};

const RunsList = ({ runs }) => {
  if (runs.length > 0) {
    return <ListGroup className="RunsList">
      {runs.sort(sortByName).map(run => (
        <ListGroupItem
          key={run._id}
          className={`clearfix ${run.archived
          ? 'archived-run'
          : ''}`}>
          {run.name}
          <span className="pull-right">
            {renderEditButton(run)}
            &nbsp; {renderArchiveButton(run)}
            &nbsp; {renderDeleteButton(run)}
          </span>
        </ListGroupItem>
      ))}
    </ListGroup>;
  }
  return <Alert bsStyle="warning">Il n'y a aucune run pour l'instant</Alert>;
};

RunsList.propTypes = {
  runs: React.PropTypes.array,
};

export default RunsList;
