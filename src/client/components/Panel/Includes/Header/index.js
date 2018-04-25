import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import logout from 'Root/actions/user/logout';

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

  @bind
  logout() {
    this.props.dispatch(logout());
  }

  render() {
    const links = [
      {
        to: '/panel',
        text: 'داشبورد'
      },
      {
        to: '/panel/setting',
        text: 'تنظیمات'
      },
      {
        to: '/panel/articles',
        text: 'مقالات شما'
      },
      {
        to: '/panel/articles/add',
        text: 'اضافه کردن مقاله'
      },
      {
        to: '/panel/articles/manage',
        text: 'مدیریت مقالات جدید',
        type: 3
      },
      {
        to: '/panel/manage',
        text: 'مدیریت کاربران جدید',
        type: 3
      },
      {
        to: '/panel/comments',
        text: 'نظرات درباره جامعه',
        type: 3
      },
      {
        to: '/panel/articles/comments',
        text: 'نظرات درباره مقالات شما'
      },
      {
        to: '/panel/conferences',
        text: 'ارائه های شما'
      },
      {
        to: '/panel/conferences/add',
        text: 'اضافه کردن ارائه'
      },
      {
        to: '/panel/conferences/manage',
        text: 'مدیریت ارائه ها',
        type: 3
      },
      {
        to: '#',
        click: this.logout,
        text: 'خروج'
      },
      {
        to: '/panel/god/manage',
        text: 'حذف فوری کاربر',
        type: 4
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

        <div
          className={`icon icon-bars ${styles.linksButton}`}
          onClick={this.showSlideOut} />

        <SlideOut isOpen={this.state.isOpen}>
          <div className={styles.slideOutContainer}>
            <div
              className={`icon icon-exit ${styles.linksButton}`}
              onClick={this.hideSlideOut} />

            <ul>
              {links.map((v, i) => <li key={i}>
                <NLink {...v} />
              </li>)}
            </ul>
          </div>
        </SlideOut>
      </header>
    );
  }
}

export default withRouter(connect(
  state => ({
    user: state.user
  })
)(Header));
