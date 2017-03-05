import React from 'react';
import { FormGroup, ControlLabel, FormControl, Button } from 'react-bootstrap';
import FontAwesome from 'react-fontawesome';
import { browserHistory } from 'react-router';
import holidayEditor from './holiday-editor.js';
import dateFaIcons from '../../../modules/date-fa-icons.js';


export default class HolidayEditor extends React.Component {

  backToList() {
    const { developer } = this.props;
    browserHistory.push(`/holidays/${developer._id}`);
  }

  componentDidMount() {
    const { holiday } = this.props;

    holidayEditor({ component: this });
    setTimeout(() => {
      $('[name="startDate"]').datetimepicker({
        daysOfWeekDisabled: [0, 6],
        icons: dateFaIcons,
        format: 'DD/MM/YYYY',
        useCurrent: false,
        locale: 'fr',
      }).on('dp.change', (e) => {
        $('[name="endDate"]').data('DateTimePicker').minDate(e.date);
      });
      $('[name="endDate"]').datetimepicker({
        daysOfWeekDisabled: [0, 6],
        icons: dateFaIcons,
        format: 'DD/MM/YYYY',
        useCurrent: false,
        locale: 'fr',
      });

      if (holiday) {
        $('[name="startDate"]').data('DateTimePicker').date(holiday.startDate);
        $('[name="endDate"]').data('DateTimePicker').date(holiday.endDate);
      }
    }, 0);
  }

  componentDidUpdate() {
    const { holiday } = this.props;
    $('[name="startDate"]').data('DateTimePicker').date(holiday.startDate);
    $('[name="endDate"]').data('DateTimePicker').date(holiday.endDate);
  }

  render() {
    const { developer, holiday } = this.props;
    return (
      <form style={{ position: 'relative' }} ref={form => (this.holidayEditorForm = form)} onSubmit={event => event.preventDefault()}>
        <input type="hidden" name="developerId" value={developer._id}/>
        <FormGroup>
          <ControlLabel>Date de début</ControlLabel>
          <FormControl type="text" name="startDate" placeholder="Date de début du congé"/>
        </FormGroup>
        <FormGroup>
          <ControlLabel>Date de fin</ControlLabel>
          <FormControl type="text" name="endDate" placeholder="Date de fin du congé"/>
        </FormGroup>
        <FormGroup>
          <ControlLabel>Demi jour? </ControlLabel>
          <input type="checkbox" name="halfDay" defaultChecked={holiday && holiday.halfDay}/>
        </FormGroup>
        <Button onClick={this.backToList.bind(this)}>
          <FontAwesome name='undo'/> Annuler
        </Button>
        &nbsp;
        <Button type="submit" bsStyle="success">
          <FontAwesome name='floppy-o'/> {holiday && holiday._id ? 'Enregistrer' : 'Ajouter'}
        </Button>
      </form>
    );
  }
}

HolidayEditor.propTypes = {
  developer: React.PropTypes.object,
  holiday: React.PropTypes.object,
};
