import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import accept from 'Root/actions/user/conferences/accept';
import reject from 'Root/actions/user/conferences/reject';

import bind from 'Root/js/bind';
import gql from 'Root/js/gql';

import LoadingProgress from 'Root/components/Utils/LoadingProgress';
import Button from 'Root/components/Utils/Button';

import styles from './index.less';


class ManageEdit extends Component {
  state = {
    conference: null
  };

  componentDidMount() {
    const query = `
    query {
      conference(_id: "${this.props.match.params.id}", type: 1) {
        _id
        end
        title
        start
        description
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
  accept() {
    accept({
      end: this.refs.end.value,
      start: this.refs.start.value,
      title: this.refs.title.value,
      _id: this.state.conference._id,
      description: this.refs.description.value
    }, this.props.history.push);
  }

  @bind
  reject() {
    reject(this.state.conference._id, this.props.history.push);
  }

  render() {
    if (!this.state.conference) {
      return <LoadingProgress />;
    }

    return (
      <div className={styles.container}>
        <h1 className={styles.title}>مدیریت کنفرانس</h1>

        <input
          type='text'
          ref='title'
          placeholder='عنوان'
          defaultValue={this.state.conference.title}
        />

        <input
          type='text'
          ref='start'
          placeholder='شروع کنفرانس'
          defaultValue={this.state.conference.start}
        />

        <input
          type='text'
          ref='end'
          placeholder='اتمام کنفرانس'
          defaultValue={this.state.conference.end}
        />

        <textarea
          ref='description'
          placeholder='توضیحات'
          defaultValue={this.state.conference.description}
        />

        <Button color='blue' handleClick={this.accept}>
          پذیرفتن
        </Button>

        <Button color='red' handleClick={this.reject}>
          نپذیرفتن
        </Button>
      </div>
    );
  }
}

export default withRouter(ManageEdit);
