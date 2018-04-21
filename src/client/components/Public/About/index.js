import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import aboutImage from 'Root/images/about.jpg';
import sg from 'Root/images/developers/sg.jpg';
import mk from 'Root/images/developers/mk.jpg';
import mm from 'Root/images/developers/mm.jpg';
import styles from './index.less';


class About extends Component {
  render() {
    return (
      <div className={styles.container}>
        <div>
          <img
            src={aboutImage}
            className={styles.aboutImage}
            alt='عکس اعضای جامعه متن باز قم'
          />
          <h1> درباره جامعه متن باز قم </h1>
        </div>

        <div className={styles.author}>
          <div>
            <h1 className={styles.developerRole}>موسس</h1>

            <div className={styles.authorInfo}>
              <img
                src={sg}
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
                  src={mk}
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
                  src={mm}
                  className={styles.developerImage}
                />
                <h1>محمد سیفی مرندی</h1>
                <p>طراحی وب</p>
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
