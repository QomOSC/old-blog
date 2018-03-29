import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import logout from 'Root/actions/user/logout';

import bind from 'Root/js/bind';


class Header extends Component {
  @bind
  userLogout() {
    this.props.dispatch(logout(this.props.history.push));
  }

  render() {
    return (
      <header>
        <button onClick={this.userLogout}>خروج</button>
      </header>
    );
  }
}

export default withRouter(connect(
  state => ({
    user: state.user
  })
)(Header));
