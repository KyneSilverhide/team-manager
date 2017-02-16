import React from 'react';
import {browserHistory} from 'react-router';
import {ListGroup,ListGroupItem,FormControl,FormGroup,ControlLabel,Alert} from 'react-bootstrap';
import {Bert} from 'meteor/themeteorchef:bert';
import {removeDeveloper} from '../../api/developers/developer.methods.js';
import {Session} from 'meteor/session';
import Waypoint from 'react-waypoint';
import Loading from '../components/Loading.js';


const handleEdit = (_id) => {
  browserHistory.push(`/developers/${_id}/edit`);
}

const handleRemove = (_id) => {
  if (confirm('Etes-vous sûr de vouloir supprimer ce développeur?')) {
    removeDeveloper.call({_id}, (error) => {
      if (error) {
        Bert.alert(error.reason, 'danger');
      } else {
        Bert.alert('Développeur supprimé', 'success');
        browserHistory.push('/developers');
      }
    });
  }
}

export default class DevelopersList extends React.Component {

  constructor(props) {
    super(props);
    Session.set('dev-limit', 6);
    Session.set('dev-search-mail', '');
  }

  _loadMoreItems() {
    Session.set('dev-limit', Session.get('dev-limit') + 6);
  };

  _filterUsersByMail() {
      Session.set('dev-search-mail', $('[name=search-mail]').val());
  }

  _renderItems() {
    const {developers} = this.props;
    return <div>
      {developers.map((developer) => (
        <ListGroupItem key={developer._id}>
          <h4>{developer.firstname} {developer.lastname}</h4>
          <img
            className="dev-avatar"
            src={"https://jira.xperthis.be/secure/useravatar?ownerId=" + developer.jiraAlias}/>
          <span className="pull-right">
            <span className="btn btn-default" onClick={() => handleEdit(developer._id)}>Editer</span>
            &nbsp;
            <span className="btn btn-danger" onClick={() => handleRemove(developer._id)}>Supprimer</span>
          </span>
          <p>
            <strong>Mail :&nbsp;</strong>
            <a href={"mailto:" + developer.mail}>{developer.mail}</a>
          </p>
          <p>
            <strong>JIRA :&nbsp;</strong>
            {developer.jiraAlias}
          </p>
        </ListGroupItem>
      ))}
    </div>
  };

  _renderWaypoint() {
    return <Waypoint onEnter={this._loadMoreItems} threshold={0}/>;
  };

  render() {
    const {developers} = this.props;
    return (
    <div>
      <FormGroup>
        <ControlLabel>Recherche <em>(mail)</em></ControlLabel>
        <FormControl type="text" name="search-mail" onKeyUp={this._filterUsersByMail} placeholder="Mail du développeur"/>
      </FormGroup>
    {developers.length > 0 ? (<ListGroup className="VersionsList">
        {this._renderItems()}
        {this._renderWaypoint()}
      </ListGroup>) : (<Alert bsStyle="warning">Il n'y a aucune développeur pour l'instant</Alert>)}
    </div>);
  }
}

DevelopersList.propTypes = {
  developers: React.PropTypes.array
};
