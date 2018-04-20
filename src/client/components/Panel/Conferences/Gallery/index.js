import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import izitoast from 'izitoast';

import addGallery from 'Root/actions/user/conferences/gallery';

import { image } from 'Root/js/validator';
import moment from 'Root/js/moment';
import bind from 'Root/js/bind';
import gql from 'Root/js/gql';

import LoadingProgress from 'Root/components/Utils/LoadingProgress';
import Button from 'Root/components/Utils/Button';

import styles from './index.less';


class Gallery extends Component {
  state = {
    conference: null,
    avatar: null
  };

  componentDidMount() {
    const query = `
      query {
        conference(_id: "${this.props.match.params.id}") {
          _id
          end
          type
          title
          start
          createdAt
        }
      }
    `;

    gql(query).then(data => {
      if (!data.data.conference._id) {
        this.props.history.push('/notfound');

        return;
      }

      this.setState({ conference: data.data.conference });
    });
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
  submit() {
    if (!this.state.avatar) {
      izitoast.warning({
        rtl: true,
        title: 'عکسی انتخاب نشده است'
      });

      return;
    }

    addGallery({
      avatar: this.state.avatar,
      _id: this.state.conference._id
    }, this.props.history.push);
  }

  render() {
    if (!this.state.conference) {
      return <LoadingProgress />;
    }

    return (
      <div className={styles.container}>
        <div>
          <h1>اطلاعات کنفرانس</h1>
          <p>عنوان: {this.state.conference.title}</p>
          <p>شروع:‌{this.state.conference.start}</p>
          <p>اتمام: {this.state.conference.end}</p>
          <p className={styles.faded}>
            {moment(new Date(this.state.conference.createdAt))}</p>
        </div>

        <div>
          <h1>اضافه کردن عکس</h1>

          <input
            type='file'
            ref='file'
            className={styles.avatarInput}
            onChange={this.updateAvatar}
          />

          <Button color='blue' handleClick={this.openInput}>
            اضافه کردن عکس
          </Button>

          <p />

          <Button color='blue' handleClick={this.submit}>
            ثبت
          </Button>
        </div>
      </div>
    );
  }
}

export default withRouter(Gallery);
