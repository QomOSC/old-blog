import React, { Component } from 'react';

import styles from './index.less';


class LoadingProgress extends Component {
  render() {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.skFadingCircle}>
          <div className={`${styles.skCircle1} ${styles.skCircle}`} />
          <div className={`${styles.skCircle2} ${styles.skCircle}`} />
          <div className={`${styles.skCircle3} ${styles.skCircle}`} />
          <div className={`${styles.skCircle4} ${styles.skCircle}`} />
          <div className={`${styles.skCircle5} ${styles.skCircle}`} />
          <div className={`${styles.skCircle6} ${styles.skCircle}`} />
          <div className={`${styles.skCircle7} ${styles.skCircle}`} />
          <div className={`${styles.skCircle8} ${styles.skCircle}`} />
          <div className={`${styles.skCircle9} ${styles.skCircle}`} />
          <div className={`${styles.skCircle10} ${styles.skCircle}`} />
          <div className={`${styles.skCircle11} ${styles.skCircle}`} />
          <div className={`${styles.skCircle12} ${styles.skCircle}`} />
        </div>
      </div>
    );
  }
}

export default LoadingProgress;
