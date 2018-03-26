import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import styles from './index.less';


class Header extends Component {
  render() {
    return (
      <header className={styles.header}>
        <Link to='/'>جامعه متن باز قم</Link>
        <ul>
          <li><Link to='/login'>ورود</Link></li>
          <li><Link to='/signup'>ثبت نام</Link></li>
          <li><Link to='/contact'>تماس با ما</Link></li>
        </ul>
      </header>
    );
  }
}

export default Header;
