import React, { Component } from 'react';

import addConference from 'Root/actions/user/conferences/add';

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
    if (e.key === ' ') {
      if (!this.state.providers.includes(this.state.provider.trim())) {
        this.state.providers.push(this.state.provider.trim());
      }

      this.setState({ provider: '' });
    }
  }

  @bind
  handleChange(e) {
    this.setState({ provider: e.target.value });
  }

  @bind
  submit() {
    addConference();
  }

  render() {
    return (
      <div className={styles.container}>
        <h1>ایجاد یک کنفرانس</h1>

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
          placeholder='ارائه دهندگان (با کاما جدا کنید)'
        />

        <Button color='blue' handleClick={this.submit}>
          ثبت
        </Button>
      </div>
    );
  }
}

export default Conferences;
