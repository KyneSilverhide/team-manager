import React from 'react';
import {
  Row,
  Col,
  Alert,
  FormGroup,
  ControlLabel,
  FormControl,
  Button,
} from 'react-bootstrap';
import handleResetPassword from '../../modules/reset-password';

export default class ResetPassword extends React.Component {
  componentDidMount() {
    handleResetPassword({ component: this, token: this.props.params.token });
  }

  handleSubmit(event) {
    event.preventDefault();
  }

  render() {
    return (
      <div className="ResetPassword">
        <Row>
          <Col xs={12} sm={6} md={4}>
            <h4 className="page-header">Reset Password</h4>
            <Alert bsStyle="info">
              Pour réinitialiser votre mot de passe, choisissez en un nouveau ci-dessous.
            </Alert>
            <form
              ref={form => (this.resetPasswordForm = form)}
              className="reset-password"
              onSubmit={this.handleSubmit}>
              <FormGroup>
                <ControlLabel>Nouveau mot de passe</ControlLabel>
                <FormControl type="password" ref="newPassword" name="newPassword" placeholder="New Password"/>
              </FormGroup>
              <FormGroup>
                <ControlLabel>Répéter le mot de passe</ControlLabel>
                <FormControl
                  type="password"
                  ref="repeatNewPassword"
                  name="repeatNewPassword"/>
              </FormGroup>
              <Button type="submit" bsStyle="success">Réinitialiser le mot de passe et se conencter</Button>
            </form>
          </Col>
        </Row>
      </div>
    );
  }
}

ResetPassword.propTypes = {
  params: React.PropTypes.object,
};
