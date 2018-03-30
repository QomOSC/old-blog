import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import izitoast from 'izitoast';

import recovery from 'Root/actions/recovery/recovery';

import { email } from 'Root/js/validator';
import bind from 'Root/js/bind';

import Form from 'Root/components/Utils/Form';

import styles from './index.less';

class Recovery extends Component {
  @bind
  recovery(refs) {
    if (!email(refs.email.value)) {
      izitoast.warning({
        rtl: true,
        title: 'ایمیل وارد شده صحیح نیست'
      });

      return;
    }

    recovery(refs.email.value, this.props.history.push);
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
        html: 'بازیابی',
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
            submitFunction={this.recovery}>
            <h1>بازیابی رمز عبور</h1>
          </Form>
        </div>
      </div>
    );
  }
}

export default withRouter(Recovery);
