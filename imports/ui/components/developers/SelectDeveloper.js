import React from 'react';
import { Modal, Button, FormGroup, ControlLabel, FormControl, InputGroup, Alert } from 'react-bootstrap';
import FontAwesome from 'react-fontawesome';
import MatchingDevelopers from '../../containers/runs/MatchingDevelopers.js';

export default class SelectDeveloper extends React.Component {

  constructor(props) {
    super(props);
    this.state = { showModal: false, mailFilter: '' };
  }

  componentDidMount() {
    const { open } = this.props;
    this.setState({ showModal: open });
  }

  close() {
    this.setState({ showModal: false });
  }

  open() {
    this.setState({ showModal: true });
  }

  chooseDeveloper(developer) {
    this.props.onChoose(developer);
  }

  updateMailFilter() {
    const mail = $('[name=search-mail]').val().trim();
    this.setState({ mailFilter: mail });
  }

  render() {
    const { label, icon } = this.props;
    return (
      <div>
          <Button type="button" onClick={() => this.open()}><FontAwesome name={icon}/> {label}</Button>
          <Modal show={this.state.showModal} onHide={() => this.close()}>
            <Modal.Header closeButton>
              <Modal.Title>{label}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <FormGroup>
                <ControlLabel>Recherche <em>(mail)</em></ControlLabel>
                <InputGroup>
                  <InputGroup.Addon><FontAwesome name='search'/></InputGroup.Addon>
                  <FormControl type="text" name="search-mail" onChange={() => this.updateMailFilter()} placeholder="Mail du développeur"/>
                </InputGroup>
              </FormGroup>
              <MatchingDevelopers onChoose={this.chooseDeveloper.bind(this)} mailFilter={this.state.mailFilter}/>
               { this.state.mailFilter === '' ? <Alert bsStyle="info">Utilisez la recherche pour trouver un développeur</Alert> : ''}
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={() => this.close()}><FontAwesome name='check'/> Fermer</Button>
            </Modal.Footer>
          </Modal>
      </div>
    );
  }
}

SelectDeveloper.propTypes = {
  onChoose: React.PropTypes.func,
  label: React.PropTypes.string,
  icon: React.PropTypes.string,
  open: React.PropTypes.bool,
};
