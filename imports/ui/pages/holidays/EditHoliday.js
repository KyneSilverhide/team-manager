import React from 'react';
import HolidayEditor from '../../components/holidays/HolidayEditor.js';

const NewHoliday = ({ developer, holiday }) => (
  <div className="NewTeam">
    <h4 className="page-header">{`${developer.firstname} ${developer.lastname}`} : Edition d'un congé</h4>
    <HolidayEditor developer={developer} holiday={holiday}/>
  </div>
);

NewHoliday.propTypes = {
  developer: React.PropTypes.object,
  holiday: React.PropTypes.object,
};

export default NewHoliday;
