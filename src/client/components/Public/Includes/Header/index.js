import React, { Component, Fragment } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import bind from 'Root/js/bind';

import SlideOut from 'Root/components/Utils/SlideOut';
import NLink from 'Root/components/Utils/NLink';

import styles from './index.less';


class Header extends Component {
  state = {
    isOpen: false
  };

  @bind
  showSlideOut() {
    this.setState({ isOpen: true });
  }

  @bind
  hideSlideOut() {
    this.setState({ isOpen: false });
  }

  shouldComponentUpdate() {
    return true;
  }

  render() {
    const links = this.props.logged ?
      <Fragment>
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
      </Fragment>;

    return (
      <header className={styles.header}>
        <Link to='/'>جامعه متن باز قم</Link>

        <ul>
          { links }
        </ul>

        <div
          className={`icon icon-bars ${styles.linksButton}`}
          onClick={this.showSlideOut} />

        <SlideOut isOpen={this.state.isOpen}>
          <div className={styles.slideOutContainer}>
            <div
              className={`icon icon-exit ${styles.linksButton}`}
              onClick={this.hideSlideOut} />

            <ul>
              { links }
            </ul>
          </div>
        </SlideOut>
      </header>
    );
  }
}

export default withRouter(connect(
  state => ({
    logged: state.user.logged
  })
)(Header));
