import React, { Component } from 'react';

import styles from './index.less';


class NotFound extends Component {
  render() {
    return (
      <div className={styles.container}>
        <h1>چنین صفحه ای وجود ندارد</h1>
      </div>
    );
  }
}

export default NotFound;
