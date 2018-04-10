import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import MarkdownIt from 'markdown-it';

import moment from 'Root/js/moment';
import bind from 'Root/js/bind';
import gql from 'Root/js/gql';

import LoadingProgress from 'Root/components/Utils/LoadingProgress';

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
      </div>
    );
  }
}

export default ArticlesHome;
