import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import types from 'Root/actions';

import LoadingProgress from 'Root/components/Utils/LoadingProgress';

import moment from 'Root/js/moment';
import gql from 'Root/js/gql';

import styles from './index.less';


class MyConferences extends Component {
  state = {
    done: false
  };

  componentDidMount() {
    const query = `
    query {
      user(username: "${this.props.username}") {
        conferences(type: 2) {
          _id
          type
          title
          start
          end
          createdAt
        }
      }
    }
    `;

    gql(query).then(data => {
      this.props.dispatch({
        type: types.conferences.LOAD,
        conferences: data.data.user.conferences
      });

      this.setState({ done: true });
    });
  }

  render() {
    if (!this.state.done) {
      return <LoadingProgress />;
    }

    return (
      <div className={styles.container}>
        {this.props.conferences.length ?
          <h1>کنفرانس های شما</h1> :
          <h1>شما هیچ کنفرانسی ندارید</h1>
        }

        {this.props.conferences.map((v, i) =>
          <div key={i} className={styles.conf}>
            <Link to={`/conferences/${v._id}`}>
              <p>موضوع: {v.title}</p>
              <p>شروع:‌ {v.start}</p>
              <p>اتمام: {v.end}</p>
              <span>{moment(new Date(v.createdAt))}</span>
            </Link>
          </div>
        )}
      </div>
    );
  }
}

export default connect(
  state => ({
    conferences: state.conferences,
    username: state.user.username
  })
)(MyConferences);
