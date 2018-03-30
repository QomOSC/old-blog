import React, { Component, Fragment } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import NLink from 'Root/components/Utils/NLink';

import styles from './index.less';


class Header extends Component {
  shouldComponentUpdate() {
    return true;
  }
  
  render() {
    return (
      <header className={styles.header}>
        <Link to='/'>جامعه متن باز قم</Link>

        <ul>
          {this.props.logged ? <Fragment>
            <li>
              <NLink
                to='/panel'
                text='داشبورد'
              />
            </li>
          </Fragment> :

          <Fragment>
            <li>
              <NLink
                to='/login'
                text='ورود'
              />
            </li>
            <li>
              <NLink
                to='/signup'
                text='ثبت نام'
              />
            </li>
          </Fragment>}
        </ul>
      </header>
    );
  }
}

export default withRouter(connect(
  state => ({
    logged: state.user.logged
  })
)(Header));
