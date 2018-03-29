import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';


class LoginRoute extends Component {
  render() {
    return this.props.user.type >= 3 ?
    <Route {...this.props} /> :
    <Redirect to='/' />;
  }
}

export default connect(
  state => ({
    user: state.user
  })
)(LoginRoute);
