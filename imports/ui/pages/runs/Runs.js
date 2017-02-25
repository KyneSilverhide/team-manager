import React from 'react';
import { Link } from 'react-router';
import { Row, Col, Button } from 'react-bootstrap';
import FontAwesome from 'react-fontawesome';
import RunsList from '../../containers/runs/RunsList.js';

const Runs = () => (
  <div className="Runs">
    <Row>
      <Col xs={ 12 }>
        <div className="page-header clearfix">
        <h4 className="pull-left">Runs</h4>
        <Link to="/runs/new">
            <Button bsStyle="success" className="pull-right"><FontAwesome name='plus'/> Ajouter un run</Button>
          </Link>
        </div>
        <RunsList />
      </Col>
    </Row>
  </div>
);

export default Runs;
