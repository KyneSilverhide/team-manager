import React from 'react';
import { FormGroup, ControlLabel, FormControl, Button } from 'react-bootstrap';
import { browserHistory } from 'react-router';
import versionEditor from '../../modules/version-editor.js';
import dateFaIcons from '../../modules/date-fa-icons.js';

const backToList = () => {
  browserHistory.push('/versions');
};

export default class TeamEditor extends React.Component {
  componentDidMount() {
    const { version } = this.props;

    versionEditor({ component: this });
    setTimeout(() => {
      document.querySelector('[name="name"]').focus();
      $('[name="startDate"]').datetimepicker({
        daysOfWeekDisabled: [0, 6],
        icons: dateFaIcons,
        format: 'DD/MM/YYYY',
        useCurrent: false,
        locale: 'fr',
      }).on('dp.change', (e) => {
        $('[name="freezeDate"]').data('DateTimePicker').minDate(e.date);
        $('[name="endDate"]').data('DateTimePicker').minDate(e.date);
      });
      $('[name="freezeDate"]').datetimepicker({
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

      $('[name="startDate"]').data('DateTimePicker').date(version.startDate);
      $('[name="endDate"]').data('DateTimePicker').date(version.endDate);
      $('[name="freezeDate"]').data('DateTimePicker').date(version.freezeDate);
    }, 0);
  }

  componentDidUpdate() {
    const { version } = this.props;
    $('[name="startDate"]').data('DateTimePicker').date(version.startDate);
    $('[name="endDate"]').data('DateTimePicker').date(version.endDate);
    $('[name="freezeDate"]').data('DateTimePicker').date(version.freezeDate);
  }

  render() {
    const { version } = this.props;
    return (
      <form style={{ position: 'relative' }} ref={form => (this.versionEditorForm = form)} onSubmit={event => event.preventDefault()}>
        <FormGroup key={version && version._id}>
          <ControlLabel>Nom</ControlLabel>
          <FormControl type="text" name="name" defaultValue={version && version.name} placeholder="Nom de la version"/>
        </FormGroup>
        <FormGroup>
          <ControlLabel>Date de début</ControlLabel>
          <FormControl type="text" name="startDate" placeholder="Date de début de la version"/>
        </FormGroup>
        <FormGroup>
          <ControlLabel>Code freeze</ControlLabel>
          <FormControl type="text" name="freezeDate" placeholder="Date de code freeze de la version"/>
        </FormGroup>
        <FormGroup>
          <ControlLabel>Date de fin</ControlLabel>
          <FormControl type="text" name="endDate" placeholder="Date de fin de la version"/>
        </FormGroup>
        <Button onClick={() => backToList()}>
          Annuler
        </Button>
        &nbsp;
        <Button type="submit" bsStyle="success">
          {version && version._id
            ? 'Enregistrer'
            : 'Ajouter'}
        </Button>
      </form>
    );
  }
}

TeamEditor.propTypes = {
  version: React.PropTypes.object,
};
