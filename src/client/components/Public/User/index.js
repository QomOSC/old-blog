import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import nprogress from 'nprogress';

import send from 'Root/js/send';

class User extends Component {
  state = {
    data: null
  };

  componentWillMount() {
    nprogress.start();
  }

  componentDidMount() {
    send(`/user/${this.props.match.params.username}`).then(data => {
      console.log(data);
      this.setState({ data });
      nprogress.done();
    }).catch(e => {
      console.log(e);
    });
  }

  render() {
    console.log(this.state.data);

    if (!this.state.data) {
      return <h1>در حال گرفتن اطلاعات</h1>;
    }

    return (
      <p>Hello</p>
    );
  }
}

export default withRouter(User);
