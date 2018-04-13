import React, { Component } from 'react';
import { connect } from 'react-redux';

import rejectUser from 'Root/actions/users/reject';
import acceptUser from 'Root/actions/users/accept';
import types from 'Root/actions';

import bind from 'Root/js/bind';
import gql from 'Root/js/gql';

import LoadingProgress from 'Root/components/Utils/LoadingProgress';

class Manage extends Component {
  componentDidMount() {
    const query = `
      query {
        users(type: 1) {
          name
        }
      }
    `;

    gql(query).then(data => {
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
      this.props.dispatch(acceptUser(_id));
    };
  }

  render() {
    if (!this.props.users) {
      return <LoadingProgress />;
    }

    return (
      <div>
        {!this.props.users.length ?
          <h1>کاربر جدیدی وجود ندارد</h1> :
          <h1>کاربران جدید</h1>
        }

        {this.props.users.map((v, i) => <h1 key={i}>{v.name}</h1>)}
      </div>
    );
  }
}

export default connect(
  state => ({
    users: state.users
  })
)(Manage);
