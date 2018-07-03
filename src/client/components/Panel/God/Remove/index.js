import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import izitoast from 'izitoast';

import remove from 'Root/actions/god/remove';

import Button from 'Root/components/Utils/Button';

import bind from 'Root/js/bind';

import styles from './index.less';


class God extends Component {
  @bind
  remove() {
    if (!this.refs.username.value) {
      izitoast.warning({
        rtl: true,
        title: 'مقادیر کافی نمی باشد'
      });

      return;
    }

    remove(this.refs.username.value, this.props.history.push);
  }

  render() {
    return (
      <div className={styles.container}>
        <h1 className={styles.title}>حذف فوری</h1>
        <div>
        <input
          type='text'
          ref='username'
          placeholder='یوزرنیم کاربر'
        />

        <Button color='green' handleClick={this.remove}>
          حذف فوری کاربر
        </Button>
        </div>
      </div>

    );
  }
}

export default withRouter(God);
