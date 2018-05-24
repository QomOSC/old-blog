import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import izitoast from 'izitoast';

import login from 'Root/actions/login';

import { email, password } from 'Root/js/validator';
import bind from 'Root/js/bind';

import Form from 'Root/components/Utils/Form';

import styles from './index.less';


class Login extends Component {
  @bind
  login(refs) {
    if (!email(refs.email.value)) {
      izitoast.warning({
        rtl: true,
        title: 'ایمیل معتبر نمیباشد'
      });

      return;
    }

    if (!password(refs.password.value)) {
      izitoast.warning({
        rtl: true,
        title: 'رمز عبور باید حداقل ۸ رقم باشد'
      });

      return;
    }

    login({
      email: refs.email.value,
      password: refs.password.value
    }, this.props.history.push);
  }

  render() {
    const inputs = [
      {
        tag: 'input',
        attrs: {
          type: 'email',
          name: 'email',
          placeholder: 'ایمیل',
          required: true
        }
      },
      {
        tag: 'input',
        attrs: {
          type: 'password',
          name: 'password',
          placeholder: 'رمز عبور',
          required: true
        }
      },
      {
        tag: 'button',
        html: 'ورود',
        attrs: {
          type: 'submit'
        }
      }
    ];

    return (
      <div className={styles.container}>
        <div>
          <Form
            inputs={inputs}
            submitFunction={this.login}>
            <h1>ورود</h1>
          </Form>
          <Link to='/recovery'>فراموشی رمز</Link>
          <p />
          <Link to='/signup'>ساخت حساب</Link>
        </div>
      </div>
    );
  }
}

export default withRouter(Login);
