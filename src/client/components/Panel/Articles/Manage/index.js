import React, { Component } from 'react';

import gql from 'Root/js/gql';

import LoadingProgress from 'Root/components/Utils/LoadingProgress';
import Article from 'Root/components/Utils/Article';

import styles from './index.less';


class Manage extends Component {
  state = {
    data: undefined
  };

  componentDidMount() {
    const query = `
      query {
        articles(type: 1) {
          createdAt
          minutes
          avatar
          title

          user {
            description
            createdAt
            articles
            username
            avatar
            email
            type
            name
          }
        }
      }
    `;

    gql(query).then(data => {
      this.setState({ data: data.data });
    });
  }

  render() {
    if (!this.state.data) {
      return <LoadingProgress />;
    }

    return (
      <div className={styles.container}>
        {this.state.data.articles.length && <h1>مقالات جدید</h1>}

        <div className={styles.articles}>
          {this.state.data.articles.map((v, i) =>
            <Article
              key={i}
              user={{ ...v.user }}
              art={{ ...v }}
            >
              <h1>Hello</h1>
            </Article>
          )}
        </div>
      </div>
    );
  }
}

export default Manage;
