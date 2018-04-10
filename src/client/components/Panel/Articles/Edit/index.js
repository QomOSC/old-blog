import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import send from 'Root/js/send';

class Edit extends Component {
  async componentDidMount() {
    const check = await send('/panel/articles/edit/check', {
      id: this.props.match.params.id
    });

    if (check.type === 2) {
      this.props.history.push('/notfound');
    }
  }

  render() {
    return <h1>Edit</h1>;
  }
}

export default withRouter(Edit);
