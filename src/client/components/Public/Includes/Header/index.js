import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import styles from './index.less';


class Header extends Component {
  render() {
    return (
      <header className={styles.header}>
        <Link to='/'>جامعه متن باز قم</Link>
        <ul>
          {this.props.logged ? <Fragment>
            <li><Link to='/signup'>داشبورد</Link></li>
          </Fragment> :
          <Fragment>
            <li><Link to='/login'>ورود</Link></li>
            <li><Link to='/signup'>ثبت نام</Link></li>
          </Fragment>}

          <li><Link to='/contact'>تماس با ما</Link></li>
        </ul>
      </header>
    );
  }
}

export default connect(
  state => ({
    logged: state.user.logged
  })
)(Header);
