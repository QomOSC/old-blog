import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import bind from 'Root/js/bind';

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
        <div className={styles.userInfo}>
          {this.renderImage()}
          <p>{this.props.user.name}</p>
          <Link
            to={`/user/${this.props.user.username}`}>
            <p className={styles.username}>
              {this.props.user.username}@
            </p>
          </Link>
        </div>
      </div>
    );
  }
}

export default connect(
  state => ({
    user: state.user
  })
)(Home);
