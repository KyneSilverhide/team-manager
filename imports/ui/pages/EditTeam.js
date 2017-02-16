import React from 'react';
import TeamEditor from '../components/TeamEditor.js';

const EditTeam = ({ team }) => (
  <div className="EditTeam">
    <h4 className="page-header">Edition de : "{ team.name }"</h4>
    <TeamEditor team={ team } />
  </div>
);

EditTeam.propTypes = {
  team: React.PropTypes.object,
};

export default EditTeam;
