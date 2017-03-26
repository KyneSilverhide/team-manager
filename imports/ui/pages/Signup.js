import React from 'react';
import { Link } from 'react-router';
import {
  Row,
  Col,
  FormGroup,
  ControlLabel,
  FormControl,
  Button,
} from 'react-bootstrap';
import handleSignup from '../../modules/signup';

export default class Signup extends React.Component {
  componentDidMount() {
    handleSignup({ component: this });
  }

  handleSubmit(event) {
    event.preventDefault();
  }

  render() {
    return (
      <div className="Signup">
        <Row>
          <Col xs={12} sm={6} md={4}>
            <h4 className="page-header">S'enregistrer</h4>
            <form ref={form => (this.signupForm = form)} onSubmit={this.handleSubmit}>
              <FormGroup>
                <ControlLabel>Email</ControlLabel>
                <FormControl type="text" ref="emailAddress" name="emailAddress" placeholder="...@xperthis.be"/>
              </FormGroup>
              <FormGroup>
                <ControlLabel>Mot de passe</ControlLabel>
                <FormControl type="password" ref="password" name="password" placeholder="Mot de passe"/>
              </FormGroup>
              <Button type="submit" bsStyle="success">S'enregistrer</Button>
            </form>
            <p>Vous avez déjà un compte?
            <Link to="/login"> Se connecter</Link>.</p>
          </Col>
        </Row>
      </div>
    );
  }
}
