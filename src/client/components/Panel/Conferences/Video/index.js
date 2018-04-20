import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import izitoast from 'izitoast';

import addVideo from 'Root/actions/user/conferences/video';

import bind from 'Root/js/bind';
import gql from 'Root/js/gql';

import LoadingProgress from 'Root/components/Utils/LoadingProgress';
import Button from 'Root/components/Utils/Button';

import styles from './index.less';


class Video extends Component {
  state = {
    conferences: null
  };

  componentDidMount() {
    const query = `
    query {
      conference(_id: "${this.props.match.params.id}") {
        _id
        title

        authorInfo {
          name
          username
        }
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
  submit() {
    if (!this.refs.embed.value) {
      izitoast.warning({
        rtl: true,
        title: 'مقادیر کافی نیست'
      });

      return;
    }

    addVideo({
      _id: this.state.conference._id,
      embed: this.refs.embed.value
    }, this.props.history.push);
  }

  render() {
    if (!this.state.conference) {
      return <LoadingProgress />;
    }

    return (
      <div className={styles.container}>
        <h1>اضافه کردن ویدیو به کنفرانس</h1>

        <h2>اطلاعات کنفرانس</h2>
        <p>عنوان: {this.state.conference.title}</p>
        <Link to={`/user/${this.state.conference.authorInfo.username}`}>
          <p className={styles.user}>
            از کاربر {this.state.conference.authorInfo.name}
          </p>
        </Link>

        <p />

        <h2>لینک embed ویدیو را اضافه کنید</h2>

        <textarea
          ref='embed'
          placeholder='For example: <div></div>'
        />

        <Button color='black' handleClick={this.submit}>
          ثبت
        </Button>
      </div>
    );
  }
}

export default withRouter(Video);
