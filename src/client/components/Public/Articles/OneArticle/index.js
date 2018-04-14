import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import MarkdownIt from 'markdown-it';
import izitoast from 'izitoast';

import send from 'Root/actions/comment/send';

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
    article: undefined
  };

  componentDidMount() {
    const query = `
      query {
        article(_id: "${this.props.match.params.id}") {
          createdAt
          minutes
          content
          avatar
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
      this.setState({ article: data.data.article });
    });
  }

  @bind
  renderImage() {
    if (this.state.article.user.avatar) {
      return <img
        src={`/static/uploads/${this.state.article.user.avatar}`}
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

  render() {
    if (!this.state.article) {
      return <LoadingProgress />;
    }

    if (this.state.article.title === null) {
      return <Redirect to='/notfound' />;
    }

    return (
      <div className={styles.container}>
        <div className={styles.user}>
          <p>{this.state.article.user.name}</p>
          <p>{this.state.article.user.email}</p>
          {this.renderImage()}
          {this.state.article.user.description && <p>
            درباره: {this.state.article.user.description}
          </p>}
        </div>

        <div className={styles.article}>
          <br />
          <h1>{this.state.article.title}</h1>
          <p>{moment(new Date(this.state.article.createdAt))}</p>
          <p>{this.state.article.minutes} دقیقه خواندن</p>
          <br />

          <img
            className={styles.articleAvatar}
            src={`/static/uploads/${this.state.article.avatar}`}
          />

          <div
            className={styles.articleContent}
            dangerouslySetInnerHTML={{
            __html: md.render(this.state.article.content)
          }} />
        </div>

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
          {this.state.article.comments.map((v, i) =>
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

export default ArticlesHome;
