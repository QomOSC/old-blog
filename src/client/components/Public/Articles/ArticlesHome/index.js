import React, { Component } from 'react';

import gql from 'Root/js/gql';

import LoadingProgress from 'Root/components/Utils/LoadingProgress';
import Article from 'Root/components/Utils/Article';

import styles from './index.less';


class ArticlesHome extends Component {
  state = {
    articles: undefined
  };

  componentDidMount() {
    const query = `
      query {
        articles(type: 2) {
          createdAt
          minutes
          avatar
          title
          _id

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
      this.setState({ articles: data.data.articles });
    });
  }

  render() {
    if (!this.state.articles) {
      return <LoadingProgress />;
    }

    return (
      <div className={styles.container}>
        {this.state.articles.length ?
          <h1>مقالات اخیر</h1> :
          <h1>مقاله ای وجود ندارد</h1>
        }
          <div className={styles.allarticle}>
        {this.state.articles.map((v, i) =>
          <Article
            key={i}
            user={{ ...v.user }}
            art={{ ...v }}
            id={v._id}
          />
        )}
        </div>
      </div>
    );
  }
}

export default ArticlesHome;
