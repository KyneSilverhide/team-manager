import React from 'react';
import { Row, Col } from 'react-bootstrap';
import RunsOverview from '../containers/RunsOverview.js';

const Index = () => (
  <div className="Runs">
    <Row>
      <Col xs={ 12 }>
        <div className="clearfix">
          <h1 className="pull-left">Contrôle du développement</h1>
        </div>
        <RunsOverview />
      </Col>
    </Row>
  </div>
);

export default Index;
