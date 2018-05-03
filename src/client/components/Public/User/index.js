import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import moment from 'Root/js/moment';
import bind from 'Root/js/bind';
import gql from 'Root/js/gql';

import LoadingProgress from 'Root/components/Utils/LoadingProgress';
import Article from 'Root/components/Utils/Article';

import userDefault from 'Root/images/u.png';
import styles from './index.less';


class User extends Component {
  state = {
    user: undefined
  };

  componentDidMount() {
    const query = `
      query {
        user(username: "${this.props.match.params.username}") {
          description
          createdAt
          articles
          username
          avatar
          email
          type
          name

          userArticles {
            createdAt
            minutes
            avatar
            title
            _id
          }
        }
      }
    `;

    gql(query).then(data => {
      if (!data.data.user) {
        this.props.history.push('/notfound');
        return;
      }

      this.setState({ user: data.data.user });
    });
  }

  @bind
  role() {
    if (this.state.user.type === 1) {
      return 'در انتظار پذیرش';
    } else if (this.state.user.type === 2) {
      return 'کاربر معمولی';
    } else if (this.state.user.type === 3) {
      return 'مدیر';
    }
    return 'مدیر کل';
  }

  @bind
  renderImage() {
    if (this.state.user.avatar) {
      return <img
        src={`/static/uploads/${this.state.user.avatar}`}
        className={styles.userImage}
      />;
    }

    return <img
      src={userDefault}
      className={styles.userImage}
    />;
  }

  render() {
    if (!this.state.user) {
      return <LoadingProgress />;
    }

    return (
      <div className={styles.container}>
        <div className={styles.user}>
          <p>{this.state.user.name}</p>
          <p>{this.state.user.email}</p>
          <p>{this.role()}</p>
          {this.renderImage()}
          {this.state.user.description ?
            <p>درباره: {this.state.user.description}</p> :
            ''
          }

          <p>عضو شده در:‌ {moment(new Date(this.state.user.createdAt))}</p>
          <p>تعداد مقالات: {this.state.user.articles}</p>
        </div>


        {this.state.user.userArticles.length ? <h1>مقالات</h1> : ''}

        <div className={styles.articles}>
          {this.state.user.userArticles.map((v, i) =>
            <Article
              key={i}
              user={{ ...this.state.user }}
              art={{ ...v }}
              id={v._id}
            />
          )}
        </div>
      </div>
    );
  }
}

export default withRouter(User);
