import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import moment from 'Root/js/moment';
import bind from 'Root/js/bind';
import gql from 'Root/js/gql';

import LoadingProgress from 'Root/components/Utils/LoadingProgress';
import Button from 'Root/components/Utils/Button';

import userDefault from 'Root/images/u.png';
import styles from './index.less';


class ArticlesHome extends Component {
  state = {
    conferences: null
  };

  componentDidMount() {
    const query = `
    query {
      conferences {
        _id
        end
        type
        title
        start
        createdAt

        authorInfo {
          name
          email
          avatar
          username
        }
      }
    }
    `;

    gql(query).then(data => {
      this.setState({ conferences: data.data.conferences });
    });
  }

  @bind
  renderImage(avatar) {
    if (avatar) {
      return <img
        className={styles.avatarImage}
        src={`/static/uploads/${avatar}`}
      />;
    }

    return <img
      src={userDefault}
      className={styles.avatarImage}
    />;
  }

  @bind
  galleryLink(id) {
    if (this.props.user && this.props.user.type > 2) {
      return (
        <div>
          <Link to={`/panel/conferences/gallery/${id}`}>
            <Button color='blue'>
              اضافه کردن عکس
            </Button>
          </Link>
          <Link to={`/panel/conferences/video/${id}`}>
            <Button color='black'>
              اضافه کردن ویدیو
            </Button>
          </Link>
        </div>
      );
    }

    return null;
  }

  render() {
    if (!this.state.conferences) {
      return <LoadingProgress />;
    }

    return (
      <div className={styles.container}>
        {this.state.conferences.length ?
          <h1>کنفرانس های اخیر</h1> :
          <h1>کنفرانسی وجود ندارد</h1>
        }

        {this.state.conferences.map((v, i) =>
          <div key={i} className={styles.conf}>
            <div className={styles.user}>
              <Link to={`/user/${v.authorInfo.username}`}>
                {this.renderImage(v.authorInfo.avatar)}
              </Link>
              <div>
                <Link to={`/user/${v.authorInfo.username}`}>
                  <p>{v.authorInfo.username}</p>
                  <p>{v.authorInfo.email}</p>
                  <p>{v.authorInfo.name}</p>
                </Link>
              </div>
            </div>
            <p>موضوع: {v.title}</p>
            <p>شروع:‌ {v.start}</p>
            <p>اتمام: {v.end}</p>
            <span>{moment(new Date(v.createdAt))}</span>
            <p />
            <Link to={`/conferences/${v._id}`}>
              <Button color='blue'>
                مشاهده
              </Button>
            </Link>

            {this.galleryLink(v._id)}
          </div>
        )}
      </div>
    );
  }
}

export default connect(
  state => ({
    user: state.user
  })
)(ArticlesHome);
