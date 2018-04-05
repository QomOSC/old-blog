import React, { Component } from 'react';

import styles from './index.less';


class SlideOut extends Component {
  render() {
    return (
      <div
        className={`${styles.slideout}
        ${this.props.isOpen ? styles.show : styles.hide}`}
        ref='slideout'>
        {this.props.children}
      </div>
    );
  }
}

export default SlideOut;
