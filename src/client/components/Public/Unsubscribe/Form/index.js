import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import izitoast from 'izitoast';

import unsubscribe from 'Root/actions/subscription/unsubscribe';

import { email } from 'Root/js/validator';
import bind from 'Root/js/bind';

import Form from 'Root/components/Utils/Form';

import styles from './index.less';


class UnsubscribeForm extends Component {
  @bind
  unsubscribe(refs) {
    if (!email(refs.email.value)) {
      izitoast.warning({
        rtl: true,
        title: 'ایمیل وارد شده صحیح نیست'
      });

      return;
    }

    unsubscribe(refs.email.value, this.props.history.push);
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
            submitFunction={this.unsubscribe}>
            <h1>خروج از خبرنامه</h1>
          </Form>
        </div>
      </div>
    );
  }
}

export default withRouter(UnsubscribeForm);
