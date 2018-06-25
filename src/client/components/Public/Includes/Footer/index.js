import React, { Component } from 'react';
import izitoast from 'izitoast';

import subscribe from 'Root/actions/subscription/subscribe';

import Button from 'Root/components/Utils/Button';

import { email } from 'Root/js/validator';
import bind from 'Root/js/bind';

import styles from './index.less';


class Footer extends Component {
  @bind
  subscribe() {
    if (!this.refs.email.value) {
      izitoast.warning({
        rtl: true,
        title: 'ایمیل خود را وارد کنید'
      });

      return;
    }

    if (!email(this.refs.email.value)) {
      izitoast.warning({
        rtl: true,
        title: 'ایمیل وارد شده صحیح نمی باشد'
      });

      return;
    }

    subscribe(this.refs.email.value);

    this.refs.email.value = '';
  }

  render() {
    return (
      <footer className={styles.footer}>
        <div>
          <h1>عضویت در خبرنامه</h1>
          <input
            ref='email'
            type='email'
            placeholder='ایمیل'
          />

          <Button color='green' handleClick={this.subscribe}>
            عضویت در خبرنامه
          </Button>
        </div>
        <p>
          این پروژه تماما متن باز بوده و شما با مراجعه به
          <a href='https://github.com/qomosc/blog'> این صفحه در گیتهاب </a>
          قادر به همکاری و مشارکت هستید.
        </p>
      </footer>
    );
  }
}

export default Footer;
