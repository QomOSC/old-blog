import React, { Component } from 'react';

import styles from './index.less';


class Footer extends Component {
  render() {
    return (
      <footer className={styles.footer}>
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
