import React from 'react';
import RunEditor from '../../components/runs/RunEditor.js';

const EditRun = ({ run, versions, teams, developers }) => (
  <div className="EditRun">
    <RunEditor run={ run } versions={ versions} teams={ teams } developers={ developers }/>
  </div>
);

EditRun.propTypes = {
  run: React.PropTypes.object,
  versions: React.PropTypes.array,
  teams: React.PropTypes.array,
  developers: React.PropTypes.array,
};

export default EditRun;
