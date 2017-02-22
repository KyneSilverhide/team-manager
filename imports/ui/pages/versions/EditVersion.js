import React from 'react';
import VersionEditor from '../../components/versions/VersionEditor.js';

const EditVersion = ({ version }) => (
  <div className="EditVersion">
    <h4 className="page-header">Edition de : "{ version.name }"</h4>
    <VersionEditor version={ version } />
  </div>
);

EditVersion.propTypes = {
  version: React.PropTypes.object,
};

export default EditVersion;
