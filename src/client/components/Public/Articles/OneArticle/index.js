import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import MarkdownIt from 'markdown-it';
import izitoast from 'izitoast';

import dislikeArticle from 'Root/actions/article/dislike';
import likeArticle from 'Root/actions/article/like';
import send from 'Root/actions/comment/send';
import types from 'Root/actions';

import { email } from 'Root/js/validator';
import moment from 'Root/js/moment';
import bind from 'Root/js/bind';
import gql from 'Root/js/gql';

import LoadingProgress from 'Root/components/Utils/LoadingProgress';
import Button from 'Root/components/Utils/Button';

import userDefault from 'Root/images/u.png';
import styles from './index.less';

const md = new MarkdownIt();


class ArticlesHome extends Component {
  state = {
    loading: true
  };

  componentDidMount() {
    const query = `
      query {
        article(_id: "${this.props.match.params.id}") {
          viewerLength
          likeLength
          createdAt
          minutes
          content
          avatar
          liked
          title
          _id

          user {
            username
            avatar
            email
            name
          }

          comments {
            description
            createdAt
            answer
            name
          }
        }
      }
    `;

    gql(query).then(data => {
      if (!data.data.article) {
        this.props.history.push('/notfound');
        return;
      }

      if (!data.data.article._id) {
        this.props.history.push('/notfound');
        return;
      }

      this.props.dispatch({
        type: types.article.LOAD,
        article: data.data.article
      });

      this.setState({ loading: false });
    });
  }

  @bind
  renderImage() {
    if (this.props.article.user.avatar) {
      return <img
        src={`/static/uploads/${this.props.article.user.avatar}`}
        className={styles.userImage}
      />;
    }

    return <img
      src={userDefault}
      className={styles.userImage}
    />;
  }

  @bind
  comment() {
    if (
      !this.refs.name.value ||
      !this.refs.email.value ||
      !this.refs.description.value
    ) {
      izitoast.warning({
        rtl: true,
        title: 'مقادیر کافی نیست'
      });
      return;
    }

    if (!email(this.refs.email.value)) {
      izitoast.warning({
        rtl: true,
        title: 'ایمیل صحیح نمیباشد'
      });
      return;
    }

    send(
      this.refs.description.value,
      this.refs.email.value,
      this.refs.name.value,
      this.props.match.params.id
    );

    this.refs.description.value = '';
    this.refs.email.value = '';
    this.refs.name.value = '';
  }

  @bind
  like(_id) {
    return () => {
      this.props.dispatch(likeArticle(_id));
    };
  }

  @bind
  dislike(_id) {
    return () => {
      this.props.dispatch(dislikeArticle(_id));
    };
  }

  render() {
    if (this.state.loading) {
      return <LoadingProgress />;
    }

    return (
      <div className={styles.container}>
        <div className={styles.user}>
          <p>{this.props.article.user.name}</p>
          <p>{this.props.article.user.email}</p>
          {this.renderImage()}
          {this.props.article.user.description && <p>
            درباره: {this.props.article.user.description}
          </p>}
        </div>

        <div className={styles.article}>
          <br />
          <h1>{this.props.article.title}</h1>
          <p>{moment(new Date(this.props.article.createdAt))}</p>
          <p>{this.props.article.minutes} دقیقه خواندن</p>
          <br />

          <img
            className={styles.articleAvatar}
            src={`/static/uploads/${this.props.article.avatar}`}
          />

          <div
            className={styles.articleContent}
            dangerouslySetInnerHTML={{
            __html: md.render(this.props.article.content)
          }} />
        </div>

        <p>تعداد لایک: {this.props.article.likeLength}</p>

        {this.props.article.liked ?
          <div
            title='برداشتن لایک'
            onClick={this.dislike(this.props.article._id)}
            className={`icon icon-heart ${styles.liked}`}
          /> :
          <div
            title='لایک کردن'
            onClick={this.like(this.props.article._id)}
            className={`icon icon-heart ${styles.disliked}`}
          />
        }

        <div className={styles.comment}>
          <input
            type='text'
            placeholder='نام'
            ref='name'
          />

          <input
            type='email'
            placeholder='ایمیل'
            ref='email'
          />

          <textarea
            placeholder='نظر'
            ref='description'
          />

          <Button color='blue' handleClick={this.comment}>
            ثبت نظر
          </Button>
        </div>

        <div className={styles.showComments}>
          {this.props.article.comments.map((v, i) =>
            <div key={i} className={styles.oneComment}>
              <div>
                <p>نام: {v.name}</p>
                <p>توضیحات: {v.description}</p>
                <p>{moment(v.createdAt)}</p>
              </div>

              {v.answer ?
                <div>
                  <p>پاسخ</p>
                  {this.renderImage()}
                  <p>{v.answer}</p>
                </div> :
                ''
              }
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default withRouter(
  connect(
    state => ({
      article: state.article
    })
  )(ArticlesHome)
);
