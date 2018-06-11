import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import userDefault from 'Root/images/u.png';
import styles from './index.less';


class Article extends Component {
  render() {
    return (
      <div className={styles.article}>

        <Link to={`/articles/${this.props.id}`}>
          {this.props.art.avatar ?
            <img src={`/static/uploads/${this.props.art.avatar}`} /> :
            ''
          }

          {this.props.art.title ?
            <h1>{this.props.art.title}</h1> :
            ''
          }

          <p>متن</p>

        </Link>

        <div className={styles.user}>
          {this.props.user.avatar ?
            <img src=
              {`/static/uploads/${this.props.user.avatar}`}
              alt='عکس کاربر'/> :

            <img src={userDefault} alt='عکس کاربر' />
          }

          <div>
            <Link to={`/user/${this.props.user.username}`}>
                {this.props.user.name}
            </Link>
            <a>ادامه مطلب  . . .</a>
          </div>
        </div>

        <div className={styles.others}>
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default Article;
