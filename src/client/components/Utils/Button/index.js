import React, { Component } from 'react';

import styles from './index.less';


class Button extends Component {
  render() {
    return (
      <button
        className={`${styles.button} ${styles[this.props.color]}`}
        onClick={this.props.handleClick}>
        {this.props.children}
      </button>
    );
  }
}

export default Button;
