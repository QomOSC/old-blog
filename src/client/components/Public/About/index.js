import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import styles from './index.less';


class About extends Component {
  render() {
    return (
      <div className={styles.container}>
        <div className={styles.top}>
          <h1> درباره جامعه متن باز قم </h1>
        </div>

        <div className={styles.author}>
          <div>
            <h1 className={styles.developerRole}>موسس</h1>

            <div className={styles.authorInfo}>
              <img
                src='/static/images/developers/sg.jpg'
                className={styles.developerImage}
              />
              <h1>سجاد گرامی</h1>
              <p>موسس جامعه متن باز قم</p>
              <div className={styles.icons}>
                <Link to='https://github.com/sgerami'>
                  <div
                    className={`icon icon-github ${styles.icon}`}
                  />
                </Link>

                <Link to='https://telegram.me/sgerami'>
                  <div
                    className={`icon icon-telegram ${styles.icon}`}
                  />
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.developersPart}>
          <div>
            <h1 className={styles.developerRole}>توسعه دهندگان</h1>

            <div className={styles.developersInfo}>
              <div className={styles.developerInfo}>
                <img
                  src='/static/images/developers/mk.jpg'
                  className={styles.developerImage}
                />
                <h1>محمد متین کابلی</h1>
                <p>برنامه نویس Back-End و Front-End</p>
                <div className={styles.icons}>
                  <Link to='https://github.com/sgerami'>
                    <div
                      className={`icon icon-github ${styles.icon}`}
                    />
                  </Link>

                  <Link to='https://telegram.me/sgerami'>
                    <div
                      className={`icon icon-telegram ${styles.icon}`}
                    />
                  </Link>
                </div>
              </div>

              <div className={styles.developerInfo}>
                <img
                  src='/static/images/developers/mm.jpg'
                  className={`${styles.developerImage} ${styles.msm}`}
                />
                <h1>محمد سیفی مرندی</h1>
                <p>طراح وب</p>
                <div className={styles.icons}>
                  <Link to='https://github.com/sgerami'>
                    <div
                      className={`icon icon-github ${styles.icon}`}
                    />
                  </Link>

                  <Link to='https://telegram.me/sgerami'>
                    <div
                      className={`icon icon-telegram ${styles.icon}`}
                    />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default About;
