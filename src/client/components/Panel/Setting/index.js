import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import izitoast from 'izitoast';

import changeDescription from 'Root/actions/user/setting/description';
import removeAvatar from 'Root/actions/user/setting/avatar/remove';
import updateAvatar from 'Root/actions/user/setting/avatar/update';
import changePassword from 'Root/actions/user/setting/password';
import changeUsername from 'Root/actions/user/setting/username';
import deleteAccount from 'Root/actions/user/setting/delete';
import changeEmail from 'Root/actions/user/setting/email';
import changeName from 'Root/actions/user/setting/name';

import { password, username, email, image } from 'Root/js/validator';
import bind from 'Root/js/bind';

import Button from 'Root/components/Utils/Button';
import Box from 'Root/components/Utils/Box';

import userDefault from 'Root/images/u.png';
import styles from './index.less';


class Setting extends Component {
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

    this.props.dispatch(changeEmail(
      this.refs.email.value,
      this.props.history.push
    ));
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

  @bind
  updateAvatar() {
    let reader = new FileReader();

    reader.addEventListener('loadend', () => {
      if (!image(this.refs.file.files[0])) {
        return;
      }

      this.props.dispatch(updateAvatar(this.refs.file.files[0]));
    });

    reader.readAsBinaryString(this.refs.file.files[0]);
  }

  @bind
  removeAvatar() {
    this.props.dispatch(removeAvatar());
  }

  @bind
  openInput() {
    this.refs.file.click();
  }

  @bind
  deleteAccount() {
    this.props.dispatch(deleteAccount(this.props.history.push));
  }

  render() {
    return (
      <div className={styles.container}>
        <Box>
          <h1 className={styles.title}>اطلاعات کاربر</h1>
          {this.renderImage()}
          <div className={styles.buttons}>
            <input
              type='file'
              ref='file'
              className={styles.avatarInput}
              onChange={this.updateAvatar} />

            <Button
              color='blue'
              handleClick={this.openInput}>
              {this.props.user.avatar ? 'تغییر عکس' : 'اضافه کردن عکس'}
            </Button>
            {this.props.user.avatar ?
              <Button
                color='red'
                handleClick={this.removeAvatar}>
                حذف عکس
              </Button> :
              ''
            }
          </div>
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
          <Button color='red' handleClick={this.deleteAccount}>
            حذف حساب
          </Button>
        </Box>
        <div>
          <Box>
            <h1 className={styles.title}>نام</h1>
            <div className={styles.fields}>
              <input
                type='text'
                ref='name'
                placeholder='نام'
                defaultValue={this.props.user.name}
              />
              <Button
                color='black'
                handleClick={this.changeName}>
                تغییر
              </Button>
            </div>
          </Box>

          <Box>
            <h1 className={styles.title}>ایمیل</h1>
            <div className={styles.fields}>
              <input
                type='email'
                ref='email'
                placeholder='ایمیل'
                defaultValue={this.props.user.email}
              />
              <Button
                color='black'
                handleClick={this.changeEmail}>
                تغییر
              </Button>
            </div>
          </Box>

          <Box>
            <h1 className={styles.title}>یوزرنیم</h1>
            <div className={styles.fields}>
              <input
                type='text'
                ref='username'
                placeholder='یوزرنیم'
                defaultValue={this.props.user.username}
              />
              <Button
                color='black'
                handleClick={this.changeUsername}>
                تغییر
              </Button>
            </div>
          </Box>

          <Box>
            <h1 className={styles.title}>رمز عبور</h1>
            <div className={styles.fields}>
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

              <Button
                color='black'
                handleClick={this.changePassword}>
                تغییر
              </Button>
            </div>
          </Box>

          <Box>
            <h1 className={styles.title}>درباره شما</h1>
            <div className={styles.fields}>
              <textarea
                ref='description'
                placeholder='درباره شما'
                >{this.props.user.description}</textarea>

                <Button
                  color='black'
                  handleClick={this.changeDescription}>
                  تغییر
                </Button>
            </div>
          </Box>
        </div>
      </div>
    );
  }
}

export default withRouter(connect(
  state => ({
    user: state.user
  })
)(Setting));
