import React, { Component } from 'react';

import LoadingProgress from 'Root/components/Utils/LoadingProgress';
import Article from 'Root/components/Utils/Article';

import gql from 'Root/js/gql';


class Articles extends Component {
  state = {
    data: undefined
  };

  componentDidMount() {
    const query = `
      query {
        user {
          name

          userArticles {
            title
          }
        }
      }
    `;

    gql(query).then(data => {
      this.setState({ data: data.data });
    });
  }

  render() {
    console.log(this.state.data);

    if (!this.state.data) {
      return <LoadingProgress />;
    }

    return (
      <Article
        user={{ avatar: 'aaa', username: 'matin', name: 'متین' }}
        art={{
          createdAt: 'سه روز پیش',
          minutes: 'سه دقیقه',
          title: 'چرا باید نحوه زندگی کردنمان را تغییر دهیم',
          avatar: 'aaa'
        }}
      />
    );
  }
}

export default Articles;
