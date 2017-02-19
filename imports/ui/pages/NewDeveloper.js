import React from 'react';
import DeveloperEditor from '../components/DeveloperEditor.js';

const NewDeveloper = ({ teams }) => (
  <div className="NewDeveloper">
    <h4 className="page-header">Ajout d'un nouveau développeur</h4>
    <DeveloperEditor teams={teams}/>
  </div>
);

export default NewDeveloper;

NewDeveloper.propTypes = {
  teams: React.PropTypes.array,
};
