import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import types from 'Root/actions';

import LoadingProgress from 'Root/components/Utils/LoadingProgress';
import Button from 'Root/components/Utils/Button';

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
          done
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
        <h1 className={styles.title}>
          {this.props.conferences.length ?
            'کنفرانس های شما' :
            'شما هیچ کنفرانسی ندارید'
          }
        </h1>
        <div className={styles.allconfer}>
        {this.props.conferences.map((v, i) =>
          <div key={i} className={styles.conf}>
            <Link to={`/conferences/${v._id}`}>
              <h3>موضوع: {v.title}</h3>
              <div>
              <p>شروع:‌ {v.start}</p>
              <p>اتمام: {v.end}</p>
              </div>
              <p className={styles.pc}>{v.done ? 'کنفرانس به اتمام رسیده است' : ''}</p>

              <span>{moment(new Date(v.createdAt))}</span>
            </Link>

            <Link to={`/panel/conferences/attenders/${v._id}`}>
              <Button color='black'>
                افرادی که حظور پیدا میکنند
              </Button>
            </Link>
          </div>
        )}
        </div>
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
