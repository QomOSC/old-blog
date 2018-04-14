import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import code from 'Root/actions/unsubscribe/code';


class Code extends Component {
  componentDidMount() {
    code(this.props.match.params.code, this.props.history.push);
  }

  render() {
    return <p>Hello</p>;
  }
}

export default withRouter(Code);
