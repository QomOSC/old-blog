import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';

import moment from 'Root/js/moment';
import bind from 'Root/js/bind';
import gql from 'Root/js/gql';

import LoadingProgress from 'Root/components/Utils/LoadingProgress';

import userDefault from 'Root/images/u.png';
import styles from './index.less';

class Attenders extends Component {
  state = {
    conference: null
  };

  componentDidMount() {
    const query = `
      query {
        conference(_id: "${this.props.match.params.id}") {
          _id
          end
          done
          title
          start
          createdAt
          attendersLength

          attendersInfo {
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
        className={styles.userAvatar}
        src={`/static/uploads/${avatar}`}
      />;
    }

    return <img
      alt='عکس کاربر'
      className={styles.userAvatar}
      src={userDefault}
    />;
  }

  render() {
    if (!this.state.conference) {
      return <LoadingProgress />;
    }

    return (
      <div className={styles.container}>
        <h1>درباره کنفرانس</h1>
        <p>عنوان: {this.state.conference.title}</p>
        <p>شروع: {this.state.conference.start}</p>
        <p>اتمام: {this.state.conference.end}</p>
        <p>ساخته شده در: {moment(new Date(this.state.conference.createdAt))}</p>
        {this.state.conference.done ?
          <p>به اتمام رسیده</p> :
          <p>به اتمام نرسیده</p>
        }
        <h3>تعداد حاظران: {this.state.conference.attendersLength}</h3>
        <p />

        <div className={styles.attenders}>
          {this.state.conference.attendersInfo.map((v, i) => {
            if (!v) {
              return null;
            }

            return (
              <div className={styles.attender} key={i}>
                {this.renderImage(v.avatar)}
                <Link to={`/user/${v.username}`}>
                  <p>{v.name}</p>
                  <p>{v.email}</p>
                  <p>{v.username}</p>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default withRouter(Attenders);
