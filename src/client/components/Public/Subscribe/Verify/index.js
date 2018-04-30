import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import verify from 'Root/actions/subscription/verify';

import LoadingProgress from 'Root/components/Utils/LoadingProgress';

class Verify extends Component {
  componentDidMount() {
    verify(this.props.match.params.token, this.props.history.push);
  }

  render() {
    return <LoadingProgress />;
  }
}

export default withRouter(Verify);
