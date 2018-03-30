import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

import styles from './index.less';


class NLink extends Component {
  render() {
    return <NavLink
      to={this.props.to}
      exact={this.props.exact || true}
      activeClassName={styles.activedNavLink}
      onClick={this.props.click}>{this.props.text}</NavLink>;
  }
}

export default NLink;
