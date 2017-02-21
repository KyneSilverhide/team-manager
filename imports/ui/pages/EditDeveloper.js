import React from 'react';
import DeveloperEditor from '../components/developers/DeveloperEditor.js';

const EditDeveloper = ({ developer, teams }) => (
  <div className="EditDeveloper">
    <h4 className="page-header">Edition de : "{ developer.firstname } { developer.lastname }"</h4>
    <DeveloperEditor developer={ developer } teams={ teams } />
  </div>
);

EditDeveloper.propTypes = {
  developer: React.PropTypes.object,
  teams: React.PropTypes.array,
};

export default EditDeveloper;
