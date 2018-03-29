import React, { Component } from 'react';

import Box from 'Root/components/Utils/Box';

import styles from './index.less';


class Home extends Component {
  render() {
    return (
      <Box>
        <div className={styles.contact}>
          <div>
            <h1>اگر سوالی دارید بپرسید</h1>
            <p>شما میتوانید تمامی انتقادات و پیشنهادات خود را ارسال کنید</p>
          </div>

          <div>
            <input
              type='text'
              refs='name'
              placeholder='نام'
            />
          </div>
        </div>
      </Box>
    );
  }
}

export default Home;
