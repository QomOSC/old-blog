import React, { Component } from 'react';
import SimpleMDE from 'react-simplemde-editor';
import { withRouter } from 'react-router-dom';
import izitoast from 'izitoast';

import newArticle from 'Root/actions/user/articles/add';

import { image } from 'Root/js/validator';
import bind from 'Root/js/bind';

import Button from 'Root/components/Utils/Button';

import 'Root/css/simplemde.less';
import styles from './index.less';


class AddArticle extends Component {
  state = {
    content: '',
    oneTag: '',
    avatar: '',
    tags: [],
  };

  @bind
  post() {
    if (!this.refs.title.value || !this.state.content) {
      izitoast.warning({
        rtl: true,
        title: 'مقادیر کافی نیستند'
      });
      return;
    }

    if (!this.state.avatar) {
      izitoast.warning({
        rtl: true,
        title: 'مقاله شما باید عکس داشته باشد'
      });

      return;
    }

    newArticle({
      title: this.refs.title.value,
      content: this.state.content,
      avatar: this.state.avatar,
      tags: this.state.tags,
      minutes: Math.ceil(this.state.content.length / 386)
    }, this.props.history.push);
  }

  @bind
  updateAvatar() {
    let reader = new FileReader();

    reader.addEventListener('loadend', () => {
      if (!image(this.refs.file.files[0])) {
        return;
      }

      this.setState({ avatar: this.refs.file.files[0] });
    });

    reader.readAsBinaryString(this.refs.file.files[0]);
  }

  @bind
  openInput() {
    this.refs.file.click();
  }

  @bind
  handle(content) {
    this.setState({ content });
  }

  @bind
  keypress(e) {
    if (e.key === ' ') {
      this.state.tags.push(this.state.oneTag);
      this.setState({ oneTag: '' });
    }
  }

  @bind
  handleChange(e) {
    this.setState({ oneTag: e.target.value });
  }

  render() {
    return (
      <div className={styles.container}>
        <input
          type='text'
          placeholder='عنوان'
          ref='title'
        />
        <SimpleMDE
          ref='content'
          value={this.state.content}
          onChange={this.handle}
          options={{
            spellChecker: false
          }}
        />

        {this.state.tags.length ? <p>تگ ها</p> : ''}

        {this.state.tags.map((v, i) => <span key={i}>{v}</span>)}

        <input
          type='file'
          ref='file'
          className={styles.avatarInput}
          onChange={this.updateAvatar} />

        <input
          type='text'
          value={this.state.oneTag}
          onChange={this.handleChange}
          onKeyPress={this.keypress}
          ref='tags'
          placeholder='برچست ها (با فاصله جدا و اضافه کنید)'
        />

        <Button
          handleClick={this.openInput}
          color='blue'>
          اضافه کردن عکس
        </Button>

        <Button handleClick={this.post} color='blue'>ثبت</Button>
      </div>
    );
  }
}

export default withRouter(AddArticle);
