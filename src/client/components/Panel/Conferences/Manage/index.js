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
        <h1 className={styles.title}>
          {this.props.conferences.length ?
            'مدیریت کنفرانس های جدید' :
            'کنفرانس جدیدی برای مدیریت وجود ندارد'
          }
        </h1>
        <div className={styles.allconf}>
        {this.props.conferences.map((v, i) =>
          <div key={i} className={styles.conf}>
            <p>{v.family}</p>
            <p>موضوع: {v.title}</p>
            <div>
            <p>شروع:‌ {v.start}</p>
            <p>اتمام: {v.end}</p>
            </div>
            <span>{moment(new Date(v.createdAt))}</span>
            <p />
            <Link to={`/panel/conferences/manage/${v._id}`}>
              <Button color='green'>
                تغییر دادن
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
    conferences: state.conferences
  })
)(Manage);
