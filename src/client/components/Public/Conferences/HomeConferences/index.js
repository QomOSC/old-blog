import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import makeAsDone from 'Root/actions/user/conferences/done';
import types from 'Root/actions';

import moment from 'Root/js/moment';
import bind from 'Root/js/bind';
import gql from 'Root/js/gql';

import LoadingProgress from 'Root/components/Utils/LoadingProgress';
import Button from 'Root/components/Utils/Button';

import userDefault from 'Root/images/u.png';
import styles from './index.less';


class ConferencesHome extends Component {
  state = {
    loading: true
  };

  componentDidMount() {
    const query = `
    query {
      conferences {
        _id
        end
        type
        done
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
      this.props.dispatch({
        type: types.conferences.LOAD,
        conferences: data.data.conferences
      });

      this.setState({ loading: false });
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
  makeAsDone(_id) {
    return () => {
      this.props.dispatch(makeAsDone(_id));
    };
  }

  @bind
  galleryLink(_id, done) {
    if (this.props.user && this.props.user.type > 2) {
      return (
        <div>
          <Link to={`/panel/conferences/gallery/${_id}`}>
            <Button color='blue'>
              اضافه کردن عکس
            </Button>
          </Link>

          <Link to={`/panel/conferences/video/${_id}`}>
            <Button color='black'>
              اضافه کردن ویدیو
            </Button>
          </Link>

          {!done &&
            <Button color='blue' handleClick={this.makeAsDone(_id)}>
              به اتمام رساندن
            </Button>
          }
        </div>
      );
    }

    return null;
  }

  render() {
    if (this.state.loading) {
      return <LoadingProgress />;
    }

    return (
      <div className={styles.container}>
        {this.props.conferences.length ?
          <h1>کنفرانس های اخیر</h1> :
          <h1>کنفرانسی وجود ندارد</h1>
        }

        {this.props.conferences.map((v, i) =>
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
            <p>{v.done ? 'به اتمام رسیده است' : 'به اتمام نرسیده است'}</p>
            <span>{moment(new Date(v.createdAt))}</span>
            <p />
            <Link to={`/conferences/${v._id}`}>
              <Button color='blue'>
                مشاهده
              </Button>
            </Link>

            {this.galleryLink(v._id, v.done)}
          </div>
        )}
      </div>
    );
  }
}

export default connect(
  state => ({
    user: state.user,
    conferences: state.conferences
  })
)(ConferencesHome);
