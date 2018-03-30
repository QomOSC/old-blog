import React, { Component } from 'react';
import { connect } from 'react-redux';

import bind from 'Root/js/bind';

import Box from 'Root/components/Utils/Box';

import userDefault from 'Root/images/u.png';
import styles from './index.less';


class Setting extends Component {
  @bind
  renderImage() {
    if (this.props.user.avatar) {
      return (
        <img
          src={`/uploads/${this.props.user.avatar}`}
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

  @bind
  changeName() {
    this.props.dispatch(this.refs.name.value);
  }

  render() {
    return (
      <div className={styles.container}>
        <Box>
          <h1 className={styles.title}>اطلاعات کاربر</h1>
          {this.renderImage()}
          <table>
            <tbody>
              <tr>
                <td>نام</td>
                <td>{this.props.user.name}</td>
              </tr>
              <tr>
                <td>یوزرنیم</td>
                <td>{this.props.user.username}</td>
              </tr>
              <tr>
                <td>ایمیل</td>
                <td>{this.props.user.email}</td>
              </tr>
            </tbody>
          </table>
        </Box>
        <div>
          <Box>
            <h1 className={styles.title}>نام</h1>
            <input
              type='text'
              ref='name'
              placeholder='نام'
              defaultValue={this.props.user.name}
            />
            <button
              onClick={this.changeName}>
              تغییر
            </button>
          </Box>
        </div>
      </div>
    );
  }
}

export default connect(
  state => ({
    user: state.user
  })
)(Setting);
