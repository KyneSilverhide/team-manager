import React from 'react';
import {
  Row,
  Col,
  Alert,
  FormGroup,
  FormControl,
  Button,
} from 'react-bootstrap';
import handleRecoverPassword from '../../modules/recover-password';

export default class RecoverPassword extends React.Component {
  componentDidMount() {
    handleRecoverPassword({ component: this });
  }

  handleSubmit(event) {
    event.preventDefault();
  }

  render() {
    return (
      <div className="RecoverPassword">
        <Row>
          <Col xs={12} sm={6} md={4}>
            <h4 className="page-header">Récupération du mot de passe</h4>
            <Alert bsStyle="info">
              Entrez votre email ci-dessous pour pouvoir changer de mot de passe
            </Alert>
            <form
              ref={form => (this.recoverPasswordForm = form)}
              className="recover-password"
              onSubmit={this.handleSubmit}>
              <FormGroup>
                <FormControl type="email" ref="emailAddress" name="emailAddress" placeholder="...@xperthis.be"/>
              </FormGroup>
              <Button type="submit" bsStyle="success">Récupérer mot de passe</Button>
            </form>
          </Col>
        </Row>
      </div>
    );
  }
}
