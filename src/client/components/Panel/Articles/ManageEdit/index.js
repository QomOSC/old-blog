import React, { Component } from 'react';
import SimpleMDE from 'react-simplemde-editor';
import { Redirect, withRouter } from 'react-router-dom';
import izitoast from 'izitoast';

import acceptArticle from 'Root/actions/user/articles/accept';
import rejectArticle from 'Root/actions/user/articles/reject';

import bind from 'Root/js/bind';
import gql from 'Root/js/gql';

import LoadingProgress from 'Root/components/Utils/LoadingProgress';

import Button from 'Root/components/Utils/Button';

import 'Root/css/simplemde.less';
import styles from './index.less';

class ManageEdit extends Component {
  state = {
    content: '',
    data: null
  };

  @bind
  accept() {
    if (!this.refs.title.value || !this.state.content) {
      izitoast.warning({
        rtl: true,
        title: 'مقادیر کافی نیستند'
      });
      return;
    }

    acceptArticle({
      title: this.refs.title.value,
      content: this.state.content,
      minutes: Math.ceil(this.state.content.length / 386),
      _id: this.state.data.article._id
    }, this.props.history.push);
  }

  @bind
  reject() {
    rejectArticle(this.state.data.article._id, this.props.history.push);
  }

  componentDidMount() {
    const query = `
      query {
        article(_id: "${this.props.match.params.id}", type: 1) {
          createdAt
          content
          minutes
          avatar
          title
          _id

          user {
            description
            createdAt
            articles
            username
            avatar
            email
            type
            name
          }
        }
      }
    `;

    gql(query).then(data => {
      this.setState({ data: data.data });

      if (data.data.article) {
        this.setState({ content: data.data.article.content });
      }
    });
  }

  @bind
  handle(e) {
    this.setState({ content: e });
  }

  render() {

    if (!this.state.data) {
      return <LoadingProgress />;
    }

    if (!this.state.data.article) {
      return <Redirect to='/notfound' />;
    }

    return (
      <div className={styles.container}>

        <h1 className={styles.title}>مدیریت مقاله</h1>

        <input
          type='text'
          placeholder='عنوان'
          ref='title'
          defaultValue={this.state.data.article.title}
        />

        <div className={styles.simplemde}>
          <SimpleMDE
            ref='content'
            value={this.state.data.article.content}
            onChange={this.handle}
            options={{
              spellChecker: false
            }}
          />
        </div>

        <div className={styles.buttons}>
          <Button handleClick={this.accept} color='blue'>پذیرفتن</Button>
          <Button handleClick={this.reject} color='red'>نپذیرفتن</Button>
        </div>
      </div>
    );
  }
}

export default withRouter(ManageEdit);
