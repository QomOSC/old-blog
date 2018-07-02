import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';

import attendConference from 'Root/actions/conference/attend';

import moment from 'Root/js/moment';
import bind from 'Root/js/bind';
import gql from 'Root/js/gql';

import LoadingProgress from 'Root/components/Utils/LoadingProgress';
import Button from 'Root/components/Utils/Button';

import userDefault from 'Root/images/u.png';
import styles from './index.less';


class Conference extends Component {
  state = {
    conference: null
  };

  componentDidMount() {
    const query = `
      query {
        conference(_id: "${this.props.match.params.id}") {
          _id
          end
          type
          done
          title
          start
          embeds
          createdAt
          galleries
          description

          authorInfo {
            name
            email
            avatar
            username
          }

          providersInfo {
            name
            email
            avatar
            username
          }
        }
      }
    `;

    gql(query).then(data => {
      if (!data.data.conference) {
        this.props.history.push('/notfound');
        return;
      }

      if (!data.data.conference._id) {
        this.props.history.push('/notfound');

        return;
      }

      this.setState({ conference: data.data.conference });
    });
  }

  @bind
  renderImage(avatar) {
    if (avatar) {
      return <img
        alt='عکس کاربر'
        className={styles.avatarImage}
        src={`/static/uploads/${avatar}`}
      />;
    }

    return <img
      alt='عکس کاربر'
      src={userDefault}
      className={styles.avatarImage}
    />;
  }

  @bind
  attend(_id) {
    return () => {
      attendConference(_id);
    };
  }

  render() {
    if (!this.state.conference) {
      return <LoadingProgress />;
    }

    return (
      <div className={styles.container}>
        <div>
          <Link to={`/user/${this.state.conference.authorInfo.username}`}>
            <h1 className={styles.title}>اطلاعات نویسنده</h1>
            <div className={styles.userconf}>
              {this.renderImage(this.state.conference.authorInfo.avatar)}
              <div>
            <p>نام: {this.state.conference.authorInfo.name}</p>
            <p className={styles.username}>
              {this.state.conference.authorInfo.username}@
            </p>
            </div>
            <p>ایمیل: {this.state.conference.authorInfo.email}</p>
            </div>
          </Link>
        </div>

        <h1 className={styles.title}>اطلاعات کنفرانس</h1>
        <div className={styles.infoconf}>
          <h3>عنوان : {this.state.conference.title}</h3>
          <div className={styles.rowtime}>
            <p>شروع کنفرانس: {this.state.conference.start}</p>
            <p>اتمام کنفرانس: {this.state.conference.end}</p>
          </div>
          <p>
            {this.state.conference.done ? 'کنفرانس به اتمام رسیده است' : ''}
          </p>

          <p className={styles.faded}>
            {moment(new Date(this.state.conference.createdAt))}
          </p>
          <p />
          <p>{this.state.conference.description}</p>

          {!this.state.conference.done ?
            <Button
              color='black'
              handleClick={this.attend(this.state.conference._id)}>
              حظور در کنفرانس
            </Button> :
            ''
          }

          {this.state.conference.galleries.map((v, i) =>
            <img
              key={i}
              alt='عکس کنفرانس'
              className={styles.conferenceImage}
              src={`/static/uploads/${v}`}
            />
          )}

          {this.state.conference.embeds.length ?
            <p>مطالب دیگر در باره این کنفرانس</p> :
            ''
          }

          {this.state.conference.embeds.map((v, i) =>
            <div
              key={i}
              dangerouslySetInnerHTML={{
                __html: v
              }}
            />
          )}
        </div>

        <div className={styles.providers}>
          <h1 className={styles.title}>ارائه دهندگان</h1>

          {this.state.conference.providersInfo.map((v, i) => {
            if (v) {
              return (
                <div key={i} className={styles.provider}>
                  <Link to={`/user/${v.username}`}>
                    {this.renderImage(v.avatar)}
                    <p>{v.name}</p>
                    <p className={styles.username}>{v.username}@</p>
                  </Link>
                </div>
              );
            }

            return null;
          })}
        </div>
      </div>
    );
  }
}

export default withRouter(Conference);
