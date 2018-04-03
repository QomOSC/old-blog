import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import userDefault from 'Root/images/u.png';
import styles from './index.less';


class Article extends Component {
  render() {
    return (
      <div className={styles.article}>
        <div className={styles.user}>
          {this.props.user.avatar ?
            <img src={this.props.user.avatar} alt='عکس کاربر'/> :
            <img src={userDefault} alt='عکس کاربر' />
          }
          <div>
            <Link to={`/user/${this.props.user.username}`}>
              {this.props.user.name || 'سلام به روی ماهت'}
            </Link>
            <p>{this.props.art.createdAt} -
              &nbsp;{this.props.art.minutes} دقیقه خواندن</p>
          </div>
        </div>
        {this.props.art.title && <h1>{this.props.art.title}</h1>}
        {this.props.art.avatar && <img src={this.props.art.avatar} />}
      </div>
    );
  }
}

export default Article;
