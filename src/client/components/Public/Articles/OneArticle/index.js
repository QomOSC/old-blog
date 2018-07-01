import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import MarkdownIt from 'markdown-it';
import izitoast from 'izitoast';

import dislikeArticle from 'Root/actions/article/dislike';
import likeArticle from 'Root/actions/article/like';
import addViewer from 'Root/actions/article/viewer';
import send from 'Root/actions/comment/send';
import types from 'Root/actions';

import { email } from 'Root/js/validator';
import moment from 'Root/js/moment';
import bind from 'Root/js/bind';
import gql from 'Root/js/gql';

import LoadingProgress from 'Root/components/Utils/LoadingProgress';
import Button from 'Root/components/Utils/Button';

import defaultImage from 'Root/images/u.png';
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

          tags {
            tagname
          }
        }
      }
    `;

    gql(query).then(async data => {
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

      fetch('https://json.geoiplookup.io/api')
        .then(res => res.json())
        .then(ipData => {
          this.props.dispatch(addViewer(data.data.article._id, ipData.ip));
        });
    });
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
    console.log(this.props.article.comments);

    return (
      <div className={styles.container}>
      <br />
      <br />
        <div className={styles.user}>
          <div className={styles.articleinfo}>
          <img src="/static/images/developers/mm.jpg" />
          <span>{this.props.article.user.name}</span>
          <span className={styles.slash}>/</span>
          <span>{moment(new Date(this.props.article.createdAt))}</span>
          </div>
          <h1>{this.props.article.title}</h1>
          <div className={styles.imgcover}>
          <img src={`/static/uploads/${this.props.article.avatar}`} />

          {/* <div className={styles.artinfo}>
              <img src="/static/images/developers/mm.jpg" />
              <span>محمد سیفی مرندی</span>
          </div> */}
          </div>
          {this.props.article.user.description ?
            <p>
            درباره: {this.props.article.user.description}
            </p> :
            ''
          }

          <div className={styles.dimg}>
          <img src={`/static/uploads/${this.props.article.avatar}`} className={styles.imgback}/>
          </div>

        </div>

        <div className={styles.article}>
          <br />

          <div
            className={styles.articleContent}
            dangerouslySetInnerHTML={{
            __html: md.render(this.props.article.content)
          }} />
        </div>


        {this.props.article.tags.length ?
          <div className={styles.tags}>
            {this.props.article.tags.map((v, i) =>
              <Link to={`/tag/${v.tagname}`} key={i}>
                <p className={styles.tag}>
                  &nbsp;&nbsp;#{v.tagname}
                </p>
              </Link>
            )}

          </div> :
          ''
        }

        <div className={styles.line} />

        <div className={styles.postutile}>
        <p>تعداد بازدید ها: {this.props.article.viewerLength}</p>

        <div className={styles.like}>
          <p>{this.props.article.likeLength}</p>

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
        </div>
        </div>

        <div className={styles.comment}>

          <div>
            <label>نام : </label>
          <input
            type='text'
            placeholder='نام'
            ref='name'
          />
            <label>ایمیل : </label>
          <input
            type='email'
            placeholder='ایمیل'
            ref='email'
          />
          </div>
          <textarea
            placeholder='نظر خود را درباره این پست بنویسید'
            ref='description'
          />
          <Button color='dark' handleClick={this.comment}>
            ثبت نظر
          </Button>
        </div>

        <div className={styles.showComments}>
          {this.props.article.comments.map((v, i) =>
            <div key={i} className={styles.oneComment}>
              <div>
                <div>
                  <img src={defaultImage} />
                  <span>{v.name}</span>
                </div>
                <div>
                  <p> {v.description}</p>
                  <label>{moment(v.createdAt)}</label>
                </div>
              </div>

              {v.answer ?
                <div className={styles.answer}>
                  <div>
                    <img src={defaultImage} />
                    <span>{v.name}</span>
                  </div>
                  <div>
                  <p>{v.answer}</p>
                  <label>{moment(v.createdAt)}</label>
                  </div>
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
