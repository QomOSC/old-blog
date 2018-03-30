import React, { Component } from 'react';
import { connect } from 'react-redux';

import Box from 'Root/components/Utils/Box';

import styles from './index.less';


class Setting extends Component {
  render() {
    return (
      <div className={styles.container}>
        <Box>
          <h1 className={styles.title}>نام</h1>
        </Box>
      </div>
    );
  }
}

export default connect(
  state => ({
    user: state.user
  })
)(Setting);
