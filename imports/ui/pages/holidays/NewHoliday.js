import React from 'react';
import HolidayEditor from '../../components/holidays/HolidayEditor.js';

const NewHoliday = ({ developer }) => (
  <div className="NewTeam">
    <h4 className="page-header">{`${developer.firstname} ${developer.lastname}`} : Ajout d'un congé</h4>
    <HolidayEditor developer={developer}/>
  </div>
);

NewHoliday.propTypes = {
  developer: React.PropTypes.object,
};

export default NewHoliday;
