import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import acceptComment from 'Root/actions/comment/accept';
import rejectComment from 'Root/actions/comment/reject';
import types from 'Root/actions';

import bind from 'Root/js/bind';
import gql from 'Root/js/gql';

import LoadingProgress from 'Root/components/Utils/LoadingProgress';
import Button from 'Root/components/Utils/Button';

import styles from './index.less';

class Comments extends Component {
  state = {
    comments: null
  };

  componentDidMount() {
    const query = `
      query {
        comment (myArticles: true, contact: false) {
          description
          email
          name
          _id

          articleData {
            avatar
            title
            _id
          }
        }
      }
    `;

    gql(query).then(data => {
      this.props.dispatch({
        type: types.comments.LOAD,
        comments: data.data.comment
      });
    });
  }

  @bind
  acceptComment(_id) {
    return () => {
      this.props.dispatch(acceptComment(_id));
    };
  }

  @bind
  rejectComment(_id) {
    return () => {
      this.props.dispatch(rejectComment(_id));
    };
  }

  render() {
    if (!this.props.comments) {
      return <LoadingProgress />;
    }

    return (
      <div className={styles.container}>
        {this.props.comments.length ?
          <h1>نظرات کاربران درباره مقالات شما</h1> :
          <h1>هیچ نظر جدیدی ثبت نشده است</h1>
        }

        {this.props.comments.map((v, i) =>
          <div className={styles.comment} key={i}>
            <div className={styles.commenter}>
              <h1>اطلاعات نظر دهنده</h1>
              <p>نام: {v.name}</p>
              <p>ایمیل: {v.email}</p>
              <p>توضیحات: {v.description}</p>
            </div>

            <div className={styles.article}>
              <h1>در این مقاله</h1>
              <Link to={`/articles/${v.articleData._id}`}>
                <p>{v.articleData.title}</p>
                <img src={`/static/uploads/${v.articleData.avatar}`} />
              </Link>
            </div>

            <div>
              <Button color='blue' handleClick={this.acceptComment(v._id)}>
                تایید و نشان دادن
              </Button>

              <Button color='red' handleClick={this.rejectComment(v._id)}>
                حذف کردن
              </Button>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default connect(
  state => ({
    comments: state.comments
  })
)(Comments);
