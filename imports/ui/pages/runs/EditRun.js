import React from 'react';
import RunEditor from '../../components/runs/RunEditor.js';

const EditRun = ({ run, versions, teams, developers, teamId }) => (
  <div className="EditRun">
    <RunEditor run={ run } versions={ versions} teams={ teams } developers={ developers } teamId={ teamId }/>
  </div>
);

EditRun.propTypes = {
  run: React.PropTypes.object,
  versions: React.PropTypes.array,
  teams: React.PropTypes.array,
  developers: React.PropTypes.array,
  teamId: React.PropTypes.object,
};

export default EditRun;
