import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import types from 'Root/actions';

import moment from 'Root/js/moment';
import gql from 'Root/js/gql';

import LoadingProgress from 'Root/components/Utils/LoadingProgress';
import Button from 'Root/components/Utils/Button';

import styles from './index.less';


class Manage extends Component {
  state = {
    done: false
  };

  componentDidMount() {
    const query = `
    query {
      conferences(type: 1) {
        _id
        type
        title
        start
        end
        createdAt
      }
    }
    `;

    gql(query).then(data => {
      this.props.dispatch({
        type: types.conferences.LOAD,
        conferences: data.data.conferences
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
          <h1>مدیریت کنفرانس های جدید</h1> :
          <h1>کنفرانس جدیدی برای مدیریت وجود ندارد</h1>
        }

        {this.props.conferences.map((v, i) =>
          <div key={i} className={styles.conf}>
            <p>موضوع: {v.title}</p>
            <p>شروع:‌ {v.start}</p>
            <p>اتمام: {v.end}</p>
            <span>{moment(new Date(v.createdAt))}</span>
            <p />
            <Link to={`/panel/conferences/manage/${v._id}`}>
              <Button color='blue'>
                تغییر دادن
              </Button>
            </Link>
          </div>
        )}
      </div>
    );
  }
}

export default connect(
  state => ({
    conferences: state.conferences
  })
)(Manage);
