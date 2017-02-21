import React from 'react';
import { Panel } from 'react-bootstrap';
import RunEditor from '../components/runs/RunEditor.js';

const NewRun = ({ versions, teams, developers }) => (
  <div className="NewRun">
    <h4 className="page-header">Ajout d'une nouveau run</h4>
    <Panel header="Visibilité" bsStyle="info">
      Les runs que vous créez ne sont visibles que par vous même
    </Panel>
    <RunEditor versions={versions} teams={teams} developers={developers}/>
  </div>
);

export default NewRun;

NewRun.propTypes = {
  versions: React.PropTypes.array,
  teams: React.PropTypes.array,
  developers: React.PropTypes.array,
};
