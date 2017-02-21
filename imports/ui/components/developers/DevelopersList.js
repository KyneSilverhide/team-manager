import React from 'react';
import { browserHistory } from 'react-router';
import { Session } from 'meteor/session';
import Waypoint from 'react-waypoint';
import Confirm from 'react-confirm-bootstrap';
import { ListGroup, ListGroupItem, FormControl, FormGroup, ControlLabel, Alert } from 'react-bootstrap';
import { Bert } from 'meteor/themeteorchef:bert';
import { removeDeveloper } from '../../../api/developers/developer.methods.js';
import { sortByName } from '../../../modules/sorting.js';

const handleEdit = (_id) => {
  browserHistory.push(`/developers/${_id}/edit`);
};

const handleRemove = (_id) => {
  removeDeveloper.call({ _id }, (error) => {
    if (error) {
      Bert.alert(error.reason, 'danger');
    } else {
      Bert.alert('Développeur supprimé', 'success');
      browserHistory.push('/developers');
    }
  });
};

export default class DevelopersList extends React.Component {

  constructor(props) {
    super(props);
    Session.set('dev-limit', 6);
    Session.set('dev-search-mail', '');
  }

  loadMoreItems() {
    Session.set('dev-limit', Session.get('dev-limit') + 6);
  }

  filterUsersByMail() {
    Session.set('dev-search-mail', $('[name=search-mail]').val());
  }

  renderItems() {
    const { developers } = this.props;
    return <div>
      {developers.sort(sortByName).map(developer => (
        <ListGroupItem key={developer._id} className='clearFix'>
          <h4>{developer.firstname} {developer.lastname}</h4>
          <img className="dev-avatar" src={`https://jira.xperthis.be/secure/useravatar?ownerId=${developer.jiraAlias}`}/>
          <span className="pull-right">
            <button className="btn btn-sm btn-default" onClick={() => handleEdit(developer._id)}>Editer</button>
            &nbsp;
            <Confirm
              onConfirm={() => handleRemove(developer._id)}
              body="Etes-vous sur de vouloir supprimer ce développeur?"
              confirmText="Supprimer" cancelText="Annuler" title="Suppression">
              <button className="btn btn-sm btn-danger">Supprimer</button>
            </Confirm>
          </span>
          <p>
            <strong>Mail :&nbsp;</strong>
            <a href={`mailto:${developer.mail}`}>{developer.mail}</a>
          </p>
          <p>
            <strong>JIRA :&nbsp;</strong>
            {developer.jiraAlias}
          </p>
        </ListGroupItem>
      ))}
    </div>;
  }

  renderWaypoint() {
    return <Waypoint onEnter={this.loadMoreItems} threshold={0}/>;
  }

  render() {
    const { developers } = this.props;
    return (
    <div>
      <FormGroup>
        <ControlLabel>Recherche <em>(mail)</em></ControlLabel>
        <FormControl type="text" name="search-mail" onKeyUp={this.filterUsersByMail} placeholder="Mail du développeur"/>
      </FormGroup>
    {developers.length > 0 ? (<ListGroup className="VersionsList">
        {this.renderItems()}
        {this.renderWaypoint()}
      </ListGroup>) : (<Alert bsStyle="warning">Il n'y a aucune développeur pour l'instant</Alert>)}
    </div>);
  }
}

DevelopersList.propTypes = {
  developers: React.PropTypes.array,
};
