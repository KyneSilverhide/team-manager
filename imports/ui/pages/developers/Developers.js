import React from 'react';
import { Link } from 'react-router';
import { Row, Col, Button } from 'react-bootstrap';
import FontAwesome from 'react-fontawesome';
import DevelopersList from '../../containers/developers/DevelopersList.js';

const Developers = () => (
  <div className="Developers">
    <Row>
      <Col xs={ 12 }>
        <div className="page-header clearfix">
          <h4 className="pull-left">Développeurs</h4>
          <Link to="/developers/new">
            <Button bsStyle="success" className="pull-right"><FontAwesome name='plus'/> Ajouter un développeur</Button>
          </Link>
        </div>
        <DevelopersList />
      </Col>
    </Row>
  </div>
);

export default Developers;
