import React, { Component } from 'react';
import { connect } from 'react-redux';

import rejectUser from 'Root/actions/users/reject';
import acceptUser from 'Root/actions/users/accept';
import types from 'Root/actions';

import bind from 'Root/js/bind';
import gql from 'Root/js/gql';

import LoadingProgress from 'Root/components/Utils/LoadingProgress';
import Button from 'Root/components/Utils/Button';

import styles from './index.less';


class Manage extends Component {
  componentDidMount() {
    const query = `
      query {
        users(type: 1) {
          username
          email
          name
          _id
        }
      }
    `;

    gql(query).then(data => {
      console.log(data);
      this.props.dispatch({
        type: types.users.LOAD,
        users: data.data.users
      });
    });
  }

  @bind
  acceptUser(_id) {
    return () => {
      this.props.dispatch(acceptUser(_id));
    };
  }

  @bind
  rejectUser(_id) {
    return () => {
      this.props.dispatch(rejectUser(_id));
    };
  }

  render() {
    if (!this.props.users) {
      return <LoadingProgress />;
    }

    return (
      <div className={styles.container}>
        <h1 className={styles.title}>
          {this.props.users.length ?
            'کاربران جدید' :
            'کاربر جدیدی وجود ندارد'
          }
        </h1>
        <div className={styles.alluser}>
        {this.props.users.map((v, i) =>
          <div key={i} className={styles.user}>
            <div>
            <p>نام : {v.name}</p>
            <p>ایمیل : {v.email}</p>
            <p>نام کاربری : {v.username}</p>
            </div>

            <div className={styles.buttons}>
              <Button
                color='green'
                handleClick={this.acceptUser(v._id)}>
                پذیرفتن کاربر
              </Button>

              <Button
                color='red'
                handleClick={this.rejectUser(v._id)}>
                نپذیرفتن کاربر
              </Button>
            </div>
          </div>
        )}
        </div>
      </div>
    );
  }
}

export default connect(
  state => ({
    users: state.users
  })
)(Manage);
