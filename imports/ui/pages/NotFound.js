import React from 'react';
import { Alert } from 'react-bootstrap';

const NotFound = () => (
  <div className="NotFound">
    <Alert bsStyle="danger">
      <p><strong>Erreur [404]</strong>: { window.location.pathname } n'existe pas.</p>
    </Alert>
  </div>
);

export default NotFound;
