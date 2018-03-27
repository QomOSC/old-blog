import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';


class LoginRoute extends Component {
  render() {
    console.log(this.props.logged);
    return this.props.logged ?
    <Route {...this.props} /> :
    <Redirect to='/' />;
  }
}

export default connect(
  state => ({
    logged: state.user.logged
  })
)(LoginRoute);
