import React from 'react';
import { Row, Col } from 'react-bootstrap';

const Loading = () => (
  <Row>
    <Col xsOffset = { 5 } xs={ 1 }>
      <i className="fa fa-spinner fa-spin fa-5x fa-fw"></i>
    </Col>
  </Row>
);

export default Loading;
