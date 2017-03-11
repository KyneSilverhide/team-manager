import React from 'react';
import { Button } from 'react-bootstrap';
import FontAwesome from 'react-fontawesome';

export default class DeveloperAssociation extends React.Component {

  constructor(props) {
    super(props);
    this.updateDevRatio = this.updateDevRatio.bind(this);
  }

  componentDidMount() {
    const { developer } = this.props;
    this.setState({ _id: developer._id });
    this.setState({ firstname: developer.firstname });
    this.setState({ lastname: developer.lastname });
    this.setState({ devRatio: developer.devRatio || 0 });
    this.setState({ mail: developer.mail });
    this.setState({ jiraAlias: developer.jiraAlias });
  }

  updateDevRatio(event) {
    const devRatio = event.target.value;
    this.setState({ devRatio });
  }

  render() {
    const { developer, onDelete } = this.props;
    return (
      <tr key={developer._id} className="developer-row">
        <td>{developer.firstname} {developer.lastname}</td>
        <td><input type="number" onChange={this.updateDevRatio} defaultValue={developer.devRatio || 0} name="devRatio"/>%</td>
        <td><Button bsStyle="danger" onClick={() => onDelete(developer)}><FontAwesome name='trash'/> Supprimer</Button></td>
      </tr>
    );
  }
}

DeveloperAssociation.propTypes = {
  developer: React.PropTypes.object,
  onDelete: React.PropTypes.func,
};
