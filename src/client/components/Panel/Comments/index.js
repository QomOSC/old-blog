import React, { Component } from 'react';
import { connect } from 'react-redux';

import accpetComment from 'Root/actions/contact/accept';
import rejectComment from 'Root/actions/contact/reject';
import types from 'Root/actions';

import LoadingProgress from 'Root/components/Utils/LoadingProgress';
import Button from 'Root/components/Utils/Button';

import bind from 'Root/js/bind';
import gql from 'Root/js/gql';

import styles from './index.less';

class Comments extends Component {
  componentDidMount() {
    const query = `
      query {
        comment(contact: true, type: 1) {
          _id
          name
          email
          description
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
  accpetComment(_id) {
    return () => {
      this.props.dispatch(accpetComment(_id, this.refs.answer.value));
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
        <h1 className={styles.title}>
          {this.props.comments.length ?
            'نظرات کاربران درباره جامعه' :
            'هیچ نظری ثبت نشده است'
          }
        </h1>

        {this.props.comments.map((v, i) =>
          <div key={i} className={styles.comment}>
            <div>
              <p>نام: {v.name}</p>
              <p>ایمیل: {v.email}</p>
              <p>نظر: {v.description}</p>
            </div>

            <div>
              <textarea
                placeholder='جواب دادن'
                ref='answer'
              />

              <Button color='blue' handleClick={this.accpetComment(v._id)}>
                پذیرفتن
              </Button>

              <Button color='red' handleClick={this.rejectComment(v._id)}>
                نپذیرفتن
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
