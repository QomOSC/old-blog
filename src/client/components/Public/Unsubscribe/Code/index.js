import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import code from 'Root/actions/subscription/code';

import LoadingProgress from 'Root/components/Utils/LoadingProgress';

class Code extends Component {
  componentDidMount() {
    code(this.props.match.params.code, this.props.history.push);
  }

  render() {
    return <LoadingProgress />;
  }
}

export default withRouter(Code);
