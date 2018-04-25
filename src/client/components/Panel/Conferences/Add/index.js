import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import izitoast from 'izitoast';

import addConference from 'Root/actions/user/conferences/add';

import { username } from 'Root/js/validator';
import bind from 'Root/js/bind';

import Button from 'Root/components/Utils/Button';

import styles from './index.less';


class Conferences extends Component {
  state = {
    providers: [],
    provider: ''
  };

  @bind
  keypress(e) {
    if (e.key !== ' ') {
      return;
    }

    if (this.state.providers.includes(this.state.provider.trim())) {
      return;
    }

    if (!username(this.state.provider.trim())) {
      izitoast.warning({
        rtl: true,
        title: 'یوزرنیم صحیح نمیباشد'
      });

      return;
    }

    this.state.providers.push(this.state.provider.trim());

    this.setState({ provider: '' });
  }

  @bind
  handleChange(e) {
    this.setState({ provider: e.target.value });
  }

  @bind
  submit() {
    if (this.refs.providers.value.length > 1) {
      izitoast.warning({
        rtl: true,
        title: 'برای اضافه کردن ارائه دهندگان، از فاصله استفاده کنید'
      });

      return;
    }
    
    if (
      !this.refs.description.value ||
      !this.state.providers.length ||
      !this.refs.title.value ||
      !this.refs.start.value ||
      !this.refs.end.value
    ) {
      izitoast.warning({
        rtl: true,
        title: 'مقادیر کافی نمیباشد'
      });

      return;
    }

    addConference({
      description: this.refs.description.value,
      providers: this.state.providers,
      title: this.refs.title.value,
      start: this.refs.start.value,
      end: this.refs.end.value
    }, this.props.history.push);
  }

  render() {
    return (
      <div className={styles.container}>
        <h1 className={styles.title}>ایجاد یک کنفرانس</h1>

        <input
          type='text'
          ref='title'
          placeholder='عنوان'
        />

        <input
          type='text'
          ref='start'
          placeholder='شروع کنفرانس'
        />

        <input
          type='text'
          ref='end'
          placeholder='اتمام کنفرانس'
        />

        <textarea
          ref='description'
          placeholder='توضیحات'
        />

        {this.state.providers.map((v, i) => <span key={i}>{v}</span>)}

        <input
          type='text'
          ref='providers'
          value={this.state.provider}
          onChange={this.handleChange}
          onKeyPress={this.keypress}
          placeholder='نام کاربری ارائه دهندگان (به فاصله جدا و اضافه کنید)'
        />

        <Button color='blue' handleClick={this.submit}>
          ثبت
        </Button>
      </div>
    );
  }
}

export default withRouter(Conferences);
