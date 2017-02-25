import React from 'react';
import { Row, Col } from 'react-bootstrap';
import RunsOverview from '../containers/runs/RunsOverview.js';

const Index = () => (
  <div className="Runs">
    <Row>
      <Col xs={ 12 }>
        <RunsOverview />
      </Col>
    </Row>
  </div>
);

export default Index;
