import React from 'react';
import { browserHistory } from 'react-router';
import {
  ListGroup,
  ListGroupItem,
  Alert,
  ButtonToolbar,
  ButtonGroup,
  Button,
} from 'react-bootstrap';
import { Bert } from 'meteor/themeteorchef:bert';
import { removeVersion } from '../../api/versions/version.methods.js';
import { sortByName } from '../../modules/sorting.js';
import HorizontalTimeline from 'react-timeline-view';

const handleEdit = (_id) => {
  browserHistory.push(`/versions/${_id}/edit`);
};

const getDates = version => [
    { date: version.startDate, title: 'Début' },
    { date: version.freezeDate, title: 'Code freeze' },
    { date: version.endDate, title: 'Fin' }];

const handleRemove = (_id) => {
  if (confirm('Etes-vous sûr de vouloir supprimer cette version?')) {
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
  }
};

const VersionsList = ({ versions }) => {
  if (versions.length > 0) {
    return <ListGroup className="VersionsList">
      {versions.sort(sortByName).map(version => (
        <ListGroupItem key={version._id}>
          <h4>{version.name}</h4>
          <span className="pull-right">
            <span className="btn btn-default" onClick={() => handleEdit(version._id)}>Editer</span>
            &nbsp;
            <span className="btn btn-danger" onClick={() => handleRemove(version._id)}>Supprimer</span>
          </span>
          <div className="timeline-wrapper">
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
