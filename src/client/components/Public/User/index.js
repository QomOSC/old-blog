import React, { Component } from 'react';
import { withRouter, Redirect } from 'react-router-dom';
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
      this.setState({ data });
      nprogress.done();
    });
  }

  render() {
    if (!this.state.data) {
      return <h1>در حال گرفتن اطلاعات</h1>;
    }

    if (this.state.data.type === 2) {
      return <Redirect to='/notfound' />;
    }

    return (
      <div>
        <p>name: {this.state.data.user.name}</p>
        <p>username: {this.state.data.user.username}</p>
        <p>email: {this.state.data.user.email}</p>
        <p>type: {this.state.data.user.type}</p>
        <p>avatar: {this.state.data.user.avatar}</p>
        <p>description: {this.state.data.user.description}</p>
        <p>created At: {this.state.data.user.createdAt}</p>
        <p>articles: {this.state.data.user.articles}</p>
      </div>
    );
  }
}

export default withRouter(User);
