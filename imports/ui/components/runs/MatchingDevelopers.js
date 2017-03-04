import React from 'react';
import { ListGroup, ListGroupItem } from 'react-bootstrap';
import FontAwesome from 'react-fontawesome';
import { sortByName } from '../../../modules/sorting.js';

export default class MatchingDevelopers extends React.Component {

  render() {
    const { matchingDevelopers, onChoose } = this.props;
    return <ListGroup>
    { matchingDevelopers.sort(sortByName).map(developer => (
      <ListGroupItem key={developer._id} className='clearfix'>
        {developer.firstname} {developer.lastname}
        <span className="pull-right">
          <button className="btn btn-sm btn-default" onClick={() => onChoose(developer)}><FontAwesome name='check'/> Choisir</button>
        </span>
      </ListGroupItem>
      ))}
    </ListGroup>;
  }
}

MatchingDevelopers.propTypes = {
  matchingDevelopers: React.PropTypes.array,
  onChoose: React.PropTypes.func,
};
