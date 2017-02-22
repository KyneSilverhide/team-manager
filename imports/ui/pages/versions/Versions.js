import React from 'react';
import { Link } from 'react-router';
import { Row, Col, Button } from 'react-bootstrap';
import VersionsList from '../../containers/versions/VersionsList.js';

const Versions = () => (
  <div className="Versions">
    <Row>
      <Col xs={ 12 }>
        <div className="page-header clearfix">
          <h4 className="pull-left">Versions</h4>
          <Link to="/versions/new">
            <Button bsStyle="success" className="pull-right">Ajouter une version</Button>
          </Link>
        </div>
        <VersionsList />
      </Col>
    </Row>
  </div>
);

export default Versions;
