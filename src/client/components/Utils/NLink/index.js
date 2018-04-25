import React, { Component } from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import styles from './index.less';


class NLink extends Component {
  forceUpdate() {
    return true;
  }

  render() {
    if (this.props.type === 3) {
      if (this.props.user.type >= 3) {
        return (
          <NavLink
            to={this.props.to}
            exact={this.props.exact || true}
            activeClassName={styles.activedNavLink}
            onClick={this.props.click}>
            {this.props.text}
          </NavLink>
        );
      } else {
        return null;
      }
    }

    else if (this.props.type === 4) {
      if (this.props.user.type === 4) {
        return <NavLink
          to={this.props.to}
          exact={this.props.exact || true}
          activeClassName={styles.activedNavLink}
          onClick={this.props.click}>{this.props.text}</NavLink>;
      } else {
        return null;
      }
    }

    return <NavLink
      to={this.props.to}
      exact={this.props.exact || true}
      activeClassName={styles.activedNavLink}
      onClick={this.props.click}>{this.props.text}</NavLink>;
  }
}

export default withRouter(connect(
  state => ({
    user: state.user
  })
)(NLink));
