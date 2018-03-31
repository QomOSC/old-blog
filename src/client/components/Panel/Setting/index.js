import React, { Component } from 'react';
import { connect } from 'react-redux';
import izitoast from 'izitoast';

import changeDescription from 'Root/actions/user/setting/description';
import changePassword from 'Root/actions/user/setting/password';
import changeUsername from 'Root/actions/user/setting/username';
import changeEmail from 'Root/actions/user/setting/email';
import changeName from 'Root/actions/user/setting/name';

import { password, username, email } from 'Root/js/validator';
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
    if (!this.refs.name.value) {
      izitoast.warning({
        rtl: true,
        title: 'مقادیر کافی نمیباشند'
      });

      return;
    }

    this.props.dispatch(changeName(this.refs.name.value));
  }

  @bind
  changeEmail() {
    if (!this.refs.email.value) {
      izitoast.warning({
        rtl: true,
        title: 'مقادیر کافی نمیباشند'
      });

      return;
    }

    if (!email(this.refs.email.value)) {
      izitoast.warning({
        rtl: true,
        title: 'ایمیل صحیح نمیباشد'
      });

      return;
    }

    this.props.dispatch(changeEmail(this.refs.email.value));
  }

  @bind
  changeUsername() {
    if (!this.refs.username.value) {
      izitoast.warning({
        rtl: true,
        title: 'مقادیر کافی نمیباشند'
      });

      return;
    }

    if (!username(this.refs.username.value)) {
      izitoast.warning({
        rtl: true,
        title: 'یوزرنیم صحیح نمیباشد'
      });

      return;
    }

    this.props.dispatch(changeUsername(this.refs.username.value));
  }

  @bind
  changeDescription() {
    if (!this.refs.description.value) {
      izitoast.warning({
        rtl: true,
        title: 'مقادیر کافی نمیباشند'
      });

      return;
    }

    this.props.dispatch(changeDescription(this.refs.description.value));
  }

  @bind
  changePassword() {
    if (!this.refs.password.value || !this.refs.newpassword.value) {
      izitoast.warning({
        rtl: true,
        title: 'مقادیر کافی نمیباشند'
      });

      return;
    }

    if (!password(this.refs.newpassword.value)) {
      izitoast.warning({
        rtl: true,
        title: 'رمز وارد شده باید حداقل ۸ رقم باشد'
      });

      return;
    }

    changePassword(this.refs.password.value, this.refs.newpassword.value);
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
                <td>ایمیل</td>
                <td>{this.props.user.email}</td>
              </tr>

              <tr>
                <td>یوزرنیم</td>
                <td>{this.props.user.username}</td>
              </tr>

              {this.props.user.description && <tr>
                <td>توضیحات</td>
                <td>{this.props.user.description}</td>
              </tr>}
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

          <Box>
            <h1 className={styles.title}>ایمیل</h1>
            <input
              type='email'
              ref='email'
              placeholder='ایمیل'
              defaultValue={this.props.user.email}
            />
            <button
              onClick={this.changeEmail}>
              تغییر
            </button>
          </Box>

          <Box>
            <h1 className={styles.title}>یوزرنیم</h1>
            <input
              type='text'
              ref='username'
              placeholder='یوزرنیم'
              defaultValue={this.props.user.username}
            />
            <button
              onClick={this.changeUsername}>
              تغییر
            </button>
          </Box>

          <Box>
            <h1 className={styles.title}>رمز عبور</h1>
            <input
              type='password'
              ref='password'
              placeholder='رمز کنونی'
            />

            <input
              type='password'
              ref='newpassword'
              placeholder='رمز جدید'
            />

            <button
              onClick={this.changePassword}>
              تغییر
            </button>
          </Box>

          <Box>
            <h1 className={styles.title}>درباره شما</h1>
            <textarea
              ref='description'
              placeholder='درباره شما'
            >{this.props.user.description}</textarea>

            <button
              onClick={this.changeDescription}>
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
