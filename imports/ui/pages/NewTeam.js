import React from 'react';
import TeamEditor from '../components/teams/TeamEditor.js';

const NewTeam = () => (
  <div className="NewTeam">
    <h4 className="page-header">Ajout d'une nouvelle équipe</h4>
    <TeamEditor />
  </div>
);

export default NewTeam;
