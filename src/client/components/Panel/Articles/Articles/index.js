import React, { Component } from 'react';

import LoadingProgress from 'Root/components/Utils/LoadingProgress';
import Article from 'Root/components/Utils/Article';

import gql from 'Root/js/gql';

import styles from './index.less';


class Articles extends Component {
  state = {
    data: undefined
  };

  componentDidMount() {
    const query = `
      query {
        user {
          articles
          username
          avatar
          email
          name

          userArticles {
            createdAt
            minutes
            avatar
            title
            _id
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
      <div className={styles.container}>
        {this.state.data.user.userArticles.map((v, i) =>
          <Article
            key={i}
            user={this.state.data.user}
            art={v}
          />
        )}
      </div>
    );
  }
}

export default Articles;
