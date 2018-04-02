import React, { Component } from 'react';

import userDefault from 'Root/images/u.png';
import styles from './index.less';


class Article extends Component {
  render() {
    return (
      <div className={styles.article}>
        <img src={userDefault} />
      </div>
    );
  }
}

export default Article;
