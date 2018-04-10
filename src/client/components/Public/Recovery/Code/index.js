import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import izitoast from 'izitoast';

import change from 'Root/actions/recovery/change';

import { password } from 'Root/js/validator';
import send from 'Root/js/send';
import bind from 'Root/js/bind';

import Form from 'Root/components/Utils/Form';

import styles from './index.less';


class Recovery extends Component {
  async componentDidMount() {
    const check = await send('/recovery/check', {
      code: this.props.match.params.code
    });

    if (check.type === 2) {
      this.props.history.push('/notfound');
    }
  }

  @bind
  async rec(refs) {
    if (!refs.password.value || !refs.repassword.value) {
      izitoast.warning({
        rtl: true,
        title: 'مقادیر کافی نمیباشد'
      });
      return;
    }

    if (refs.password.value !== refs.repassword.value) {
      izitoast.warning({
        rtl: true,
        title: 'رمز و تکرار مشابه نمیباشند'
      });

      return;
    }

    if (!password(refs.password.value)) {
      izitoast.warning({
        rtl: true,
        title: 'رمز عبور باید حداقل هشت رقم باشد'
      });
      return;
    }

    change(
      this.props.match.params.code,
      refs.password.value,
      this.props.history.push
    );
  }

  render() {
    const inputs = [
      {
        tag: 'input',
        attrs: {
          type: 'password',
          name: 'password',
          placeholder: 'رمز جدید',
          required: true
        }
      },
      {
        tag: 'input',
        attrs: {
          type: 'password',
          name: 'repassword',
          placeholder: 'تکرار رمز جدید',
          required: true
        }
      },
      {
        tag: 'button',
        html: 'ثبت نام',
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
            submitFunction={this.rec}>
            <h1>تغییر رمز عبور</h1>
          </Form>
        </div>
      </div>
    );
  }
}

export default withRouter(Recovery);
