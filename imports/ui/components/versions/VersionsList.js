import React from 'react';
import { browserHistory } from 'react-router';
import HorizontalTimeline from 'react-timeline-view';
import { ListGroup, ListGroupItem, Alert } from 'react-bootstrap';
import Confirm from 'react-confirm-bootstrap';
import FontAwesome from 'react-fontawesome';
import { Bert } from 'meteor/themeteorchef:bert';
import { removeVersion } from '../../../api/versions/version.methods.js';
import { sortByName } from '../../../modules/sorting.js';

const handleEdit = (_id) => {
  browserHistory.push(`/versions/${_id}/edit`);
};

const getDates = version => [
    { date: version.startDate, title: 'Début' },
    { date: version.freezeDate, title: 'Code freeze' },
    { date: version.endDate, title: 'Fin' }];

const handleRemove = (_id) => {
  removeVersion.call({
    _id,
  }, (error) => {
    if (error) {
      Bert.alert(error.reason, 'danger');
    } else {
      Bert.alert('Equipe supprimée', 'success');
      browserHistory.push('/versions');
    }
  });
};

const VersionsList = ({ versions }) => {
  if (versions.length > 0) {
    return <ListGroup className="VersionsList">
      {versions.sort(sortByName).map(version => (
        <ListGroupItem key={version._id} className='clearfix'>
          <h4>{version.name}</h4>
          <span className="pull-right">
            <button className="btn btn-sm btn-default" onClick={() => handleEdit(version._id)}><FontAwesome name='pencil'/> Editer</button>
            &nbsp;
            <Confirm
              onConfirm={() => handleRemove(version._id)}
              body="Etes-vous sur de vouloir supprimer cette version? Cela aura un impact sur les Runs liés."
              confirmText="Supprimer" cancelText="Annuler" title="Suppression">
              <button className="btn btn-sm btn-danger"><FontAwesome name='trash'/> Supprimer</button>
            </Confirm>
          </span>
          <div className="timeline-wrapper hidden-xs">
            <HorizontalTimeline index={2} eventsMinDistance={50} values={ getDates(version) } />
          </div>
        </ListGroupItem>
      ))}
    </ListGroup>;
  }
  return <Alert bsStyle="warning">Il n'y a aucune version pour l'instant</Alert>;
};

VersionsList.propTypes = {
  versions: React.PropTypes.array,
};

export default VersionsList;
