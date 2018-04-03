import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import bind from 'Root/js/bind';

import Box from 'Root/components/Utils/Box';

import userDefault from 'Root/images/u.png';
import styles from './index.less';


class Home extends Component {
  @bind
  renderImage() {
    if (this.props.user.avatar) {
      return (
        <img
          src={`/static/uploads/${this.props.user.avatar}`}
          className={styles.userAvatar}
        />
      );
    }

    return (
      <img
        src={userDefault}
        className={styles.userAvatar}
      />
    );
  }

  render() {
    return (
      <div className={styles.container}>
        <Box>
          {this.renderImage()}
          <p>نام: {this.props.user.name}</p>
          <p>ایمیل: {this.props.user.email}</p>
          <p>
            <Link
              to={`/user/${this.props.user.username}`}>
              یوزرنیم: {this.props.user.username}
            </Link>
          </p>
        </Box>
        <Box />
        <Box />
      </div>
    );
  }
}

export default connect(
  state => ({
    user: state.user
  })
)(Home);
