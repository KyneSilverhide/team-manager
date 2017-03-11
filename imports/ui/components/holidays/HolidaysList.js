import React from 'react';
import { browserHistory } from 'react-router';
import { ListGroup, ListGroupItem, Alert, Label } from 'react-bootstrap';
import Confirm from 'react-confirm-bootstrap';
import FontAwesome from 'react-fontawesome';
import moment from 'moment';
import business from 'moment-business';
import { Bert } from 'meteor/themeteorchef:bert';
import { removeHoliday } from '../../../api/holidays/holiday.methods.js';
import { sortByEndDate } from '../../../modules/sorting.js';

const handleEdit = (_id) => {
  browserHistory.push(`/holidays/${_id}/edit`);
};

const getWeekDaysCount = (holiday) => {
  const workingDaysInHoliday = business.weekDays(moment(holiday.startDate), moment(holiday.endDate).add(1, 'day'));
  return holiday.halfDay ? workingDaysInHoliday / 2 : workingDaysInHoliday;
};

const handleRemove = (_id) => {
  removeHoliday.call({
    _id,
  }, (error) => {
    if (error) {
      Bert.alert(error.reason, 'danger');
    } else {
      Bert.alert('Congé supprimé', 'success');
      browserHistory.push(`/holidays/${this.props.developer._id}`);
    }
  });
};

const HolidaysList = ({ developer, holidays }) => {
  if (holidays.length > 0) {
    return <ListGroup className="HolidaysList">
      {holidays.sort(sortByEndDate).map(holiday => (
        <ListGroupItem key={holiday._id} className='clearfix'>
          <h2><Label bsStyle="info">{getWeekDaysCount(holiday)} jour(s)</Label></h2> du {moment(holiday.startDate).format('DD/MM/YYYY')} au {moment(holiday.endDate).format('DD/MM/YYYY')}
          <span className="pull-right">
            <button className="btn btn-sm btn-default" onClick={() => handleEdit(holiday._id)}><FontAwesome name='pencil'/> Editer</button>
            &nbsp;
            <Confirm
              onConfirm={() => handleRemove(holiday._id)}
              body="Etes-vous sur de vouloir supprimer ce congé?"
              confirmText="Supprimer" cancelText="Annuler" title="Suppression">
              <button className="btn btn-sm btn-danger"><FontAwesome name='trash'/> Supprimer</button>
            </Confirm>
          </span>
          </ListGroupItem>
      ))}
    </ListGroup>;
  }
  return <Alert bsStyle="warning">{`${developer.firstname} ${developer.lastname}`} n'a aucun congé pour l'instant</Alert>;
};

HolidaysList.propTypes = {
  developer: React.PropTypes.object,
  holidays: React.PropTypes.array,
};

export default HolidaysList;
