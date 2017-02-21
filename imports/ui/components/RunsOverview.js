import React from 'react';
import { ListGroup, ListGroupItem, Alert } from 'react-bootstrap';
import { sortByName } from '../../modules/sorting.js';

const RunsOverview = ({ runs }) => {
  if (runs.length > 0) {
    return <ListGroup className="RunsList">
      {runs.sort(sortByName).map(run => (
        <ListGroupItem
          key={run._id}
          className={`clearfix ${run.archived
          ? 'archived-run'
          : ''}`}>
          {run.name}
        </ListGroupItem>
      ))}
    </ListGroup>;
  }
  return <Alert bsStyle="warning">Il n'y a aucune run pour l'instant</Alert>;
};

RunsOverview.propTypes = {
  runs: React.PropTypes.array,
};

export default RunsOverview;
