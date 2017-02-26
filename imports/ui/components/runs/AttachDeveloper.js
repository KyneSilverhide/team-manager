import React from 'react';
import { Modal, Button, FormGroup, ControlLabel, FormControl, InputGroup, Alert } from 'react-bootstrap';
import FontAwesome from 'react-fontawesome';
import MatchingDevelopers from '../../containers/runs/MatchingDevelopers.js';

export default class AttachDeveloper extends React.Component {

  constructor(props) {
    super(props);
    this.state = { showModal: false, mailFilter: '' };
  }

  close() {
    this.setState({ showModal: false });
  }

  open() {
    this.setState({ showModal: true });
  }

  addDeveloper(developer) {
    this.props.onAdd(developer);
  }

  updateMailFilter() {
    const mail = $('[name=search-mail]').val().trim();
    this.setState({ mailFilter: mail });
  }

  render() {
    return (
      <tr>
        <td>
          <Button type="button" onClick={() => this.open()}><FontAwesome name='user-plus'/> Ajouter développeur(s)</Button>
          <Modal show={this.state.showModal} onHide={() => this.close()}>
            <Modal.Header closeButton>
              <Modal.Title>Ajouter un développeur</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <FormGroup>
                <ControlLabel>Recherche <em>(mail)</em></ControlLabel>
                <InputGroup>
                  <InputGroup.Addon><FontAwesome name='search'/></InputGroup.Addon>
                  <FormControl type="text" name="search-mail" onChange={() => this.updateMailFilter()} placeholder="Mail du développeur"/>
                </InputGroup>
              </FormGroup>
              <MatchingDevelopers onAdd={this.addDeveloper.bind(this)} mailFilter={this.state.mailFilter}/>
               { this.state.mailFilter === '' ? <Alert bsStyle="info">Utilisez la recherche pour afficher trouver un développeur</Alert> : ''}
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={() => this.close()}><FontAwesome name='check'/> Fermer</Button>
            </Modal.Footer>
          </Modal>
        </td>
      </tr>
    );
  }
}

AttachDeveloper.propTypes = {
  onAdd: React.PropTypes.func,
};
