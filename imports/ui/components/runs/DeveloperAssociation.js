import React from 'react';
import 'react-rangeslider/lib/index.css';

export default class DeveloperAssociation extends React.Component {

  constructor(props) {
    super(props);
    this.updateHolidays = this.updateHolidays.bind(this);
    this.updateDevRatio = this.updateDevRatio.bind(this);
  }

  componentDidMount() {
    const { developer } = this.props;
    this.setState({ _id: developer._id });
    this.setState({ firstname: developer.firstname });
    this.setState({ lastname: developer.lastname });
    this.setState({ holidays: developer.holidays || 0 });
    this.setState({ devRatio: developer.devRatio || 0 });
    this.setState({ mail: developer.mail });
    this.setState({ jiraAlias: developer.jiraAlias });
  }

  updateHolidays(event) {
    const holidays = event.target.value;
    this.setState({ holidays });
  }

  updateDevRatio(event) {
    const devRatio = event.target.value;
    this.setState({ devRatio });
  }

  render() {
    const { developer } = this.props;
    return (
      <tr key={developer._id} className="developer-row">
        <td>{developer.firstname} {developer.lastname}</td>
        <td><input type="number" onChange={this.updateHolidays} defaultValue={developer.holidays || 0} name="holidays"/>jour(s)</td>
        <td><input type="number" onChange={this.updateDevRatio} defaultValue={developer.devRatio || 0} name="devRatio"/>%</td>
      </tr>
    );
  }
}

DeveloperAssociation.propTypes = {
  developer: React.PropTypes.object,
};
