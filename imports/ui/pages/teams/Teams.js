import React from 'react';
import { Link } from 'react-router';
import { Row, Col, Button } from 'react-bootstrap';
import FontAwesome from 'react-fontawesome';
import TeamsList from '../../containers/teams/TeamsList.js';

const Teams = () => (
  <div className="Teams">
    <Row>
      <Col xs={ 12 }>
        <div className="page-header clearfix">
          <h4 className="pull-left">Equipes</h4>
          <Link to="/teams/new">
            <Button bsStyle="success" className="pull-right"><FontAwesome name='plus'/> Ajouter une équipe</Button>
          </Link>
        </div>
        <TeamsList />
      </Col>
    </Row>
  </div>
);

export default Teams;
