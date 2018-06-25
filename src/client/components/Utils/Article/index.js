import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import MarkdownIt from 'markdown-it';

import short from 'Root/js/short';
import strip from 'Root/js/strip';

import userDefault from 'Root/images/u.png';
import styles from './index.less';

const md = new MarkdownIt();

class Article extends Component {
  render() {
    return (
      <div className={styles.article}>
        <Link to={`/articles/${this.props.art._id}`}>
          <img src={`/static/uploads/${this.props.art.avatar}`} />
          <h1>{this.props.art.title}</h1>
          <p>{strip(short(md.render(this.props.art.content)))}</p>
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

            <Link to={`/articles/${this.props.art._id}`}>ادامه مطلب . . .</Link>
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
