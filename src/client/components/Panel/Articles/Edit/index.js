import React, { Component } from 'react';
import SimpleMDE from 'react-simplemde-editor';
import { withRouter } from 'react-router-dom';
import izitoast from 'izitoast';

import edit from 'Root/actions/user/articles/edit';

import bind from 'Root/js/bind';
import gql from 'Root/js/gql';

import LoadingProgress from 'Root/components/Utils/LoadingProgress';
import Button from 'Root/components/Utils/Button';

import styles from './index.less';
import 'Root/css/simplemde.less';

class Edit extends Component {
  state = {
    article: undefined,
    content: ''
  };

  async componentDidMount() {
    const query = `
      query {
        user {
          article (_id: "${this.props.match.params.id}") {
            title
            content
          }
        }
      }
    `;

    gql(query).then(data => {
      if (!data.data.user.article.title) {
        this.props.history.push('/notfound');
        return;
      }

      this.setState({
        article: data.data.user.article,
        content: data.data.user.article.content
      });
    });
  }

  @bind
  edit() {
    if (!this.state.content || !this.refs.title.value) {
      izitoast.warning({
        rtl: true,
        title: 'مقادیر کافی نمیباشد'
      });

      return;
    }

    edit({
      id: this.props.match.params.id,
      title: this.refs.title.value,
      content: this.state.content
    }, this.props.history.push);
  }

  @bind
  handle(e) {
    this.setState({ content: e });
  }

  render() {
    if (!this.state.article) {
      return <LoadingProgress />;
    }

    return (
      <div className={styles.container}>
        <input
          type='text'
          placeholder='عنوان'
          ref='title'
          defaultValue={this.state.article.title}
        />

        <div className={styles.simplemde}>
          <SimpleMDE
            ref='content'
            value={this.state.content}
            onChange={this.handle}
            options={{
              spellChecker: false
            }}
          />
        </div>

        <Button handleClick={this.edit} color='blue'>ثبت</Button>
      </div>
    );
  }
}

export default withRouter(Edit);
