import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import logout from 'Root/actions/user/logout';

import bind from 'Root/js/bind';

import NLink from 'Root/components/Utils/NLink';

import styles from './index.less';


class Header extends Component {
  shouldComponentUpdate() {
    return true;
  }

  @bind
  logout() {
    this.props.dispatch(logout());
  }

  render() {
    const links = [
      {
        to: '/panel/setting',
        text: 'تنظیمات'
      },
      {
        to: '#',
        click: this.logout,
        text: 'خروج'
      }
    ];

    return (
      <header className={styles.header}>
        <Link to='/'>جامعه متن باز قم</Link>

        <ul>
          {links.map((v, i) => <li key={i}>
            <NLink {...v} />
          </li>)}
        </ul>
      </header>
    );
  }
}

export default withRouter(connect(
  state => ({
    user: state.user
  })
)(Header));
