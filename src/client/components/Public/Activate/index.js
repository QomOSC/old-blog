import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import activate from 'Root/actions/activate';

import LoadingProgress from 'Root/components/Utils/LoadingProgress';

class Activate extends Component {
  componentDidMount() {
    activate(this.props.match.params.code, this.props.history.push);
  }

  render() {
    return <LoadingProgress />;
  }
}

export default withRouter(Activate);
