import React from 'react';
import { Link, browserHistory } from 'react-router';
import { Row, Col, Button } from 'react-bootstrap';
import FontAwesome from 'react-fontawesome';
import HolidaysList from '../../components/holidays/HolidaysList.js';
import SelectDeveloper from '../../components/developers/SelectDeveloper.js';

export default class Holidays extends React.Component {

  constructor(props) {
    super(props);
    this.setCurrentDeveloper = this.setCurrentDeveloper.bind(this);
    this.renderDeveloperSelection = this.renderDeveloperSelection.bind(this);
    this.renderHolidays = this.renderHolidays.bind(this);
    this.renderAddHoliday = this.renderAddHoliday.bind(this);
    this.developerName = this.developerName.bind(this);
  }

  setCurrentDeveloper(developer) {
    browserHistory.push(`/holidays/${developer._id}`);
  }

  renderDeveloperSelection() {
    return <SelectDeveloper onChoose={this.setCurrentDeveloper} label="Choisir un développeur" icon="search" open={true}/>;
  }

  developerName() {
    const { developer } = this.props;
    return developer ? (`${developer.firstname} ${developer.lastname}`) : '';
  }

  renderHolidays() {
    const { developer, holidays } = this.props;
    return <HolidaysList developer={developer} holidays={holidays}/>;
  }

  renderAddHoliday() {
    const { developer } = this.props;
    return (
      <div>
        <Link to={`/holidays/${developer._id}/new`}>
          <Button bsStyle="success" className="pull-right"><FontAwesome name='plus'/> Ajouter un congé</Button>
        </Link>
        <Link to={'/holidays'}>
          <Button bsStyle="default" className="pull-right"><FontAwesome name='undo'/> Changer de développeur</Button>
        </Link>
      </div>);
  }

  render() {
    const { developer } = this.props;
    return (
    <div className="Holidays">
      <Row>
        <Col xs={ 12 }>
          <div className="page-header clearfix">
            <h4 className="pull-left">Congés : {this.developerName()}</h4>
            {developer ? this.renderAddHoliday() : ''}
          </div>
        </Col>
      </Row>
      <Row>
        <Col xs={ 12 }>
          {developer ? this.renderHolidays() : this.renderDeveloperSelection()}
        </Col>
      </Row>
    </div>
    );
  }
}

Holidays.propTypes = {
  developer: React.PropTypes.object,
  holidays: React.PropTypes.array,
};
