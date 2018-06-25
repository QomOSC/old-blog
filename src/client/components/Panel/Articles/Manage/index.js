import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import gql from 'Root/js/gql';

import LoadingProgress from 'Root/components/Utils/LoadingProgress';
import Article from 'Root/components/Utils/Article';
import Button from 'Root/components/Utils/Button';

import styles from './index.less';


class Manage extends Component {
  state = {
    articles: undefined
  };

  componentDidMount() {
    const query = `
      query {
        articles(type: 1) {
          createdAt
          content
          avatar
          title
          _id

          user {
            username
            avatar
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
        <h1 className={styles.title}>
          {this.state.articles.length ?
            'مقالات جدید' :
            'مقاله جدیدی وجود ندارد'
          }
        </h1>

        <div className={styles.articles}>
          {this.state.articles.map((v, i) =>
            <Article
              key={i}
              user={{ ...v.user }}
              art={{ ...v }}
            >
              <h1>
                برای پذیرفتن یا نپذیرفتن مقاله
                وارد قسمت تغییر دادن شوید
              </h1>
              <Link to={`/panel/articles/manage/${v._id}`}>
                <Button color='blue'>
                  تغییر دادن
                </Button>
              </Link>
            </Article>
          )}
        </div>
      </div>
    );
  }
}

export default Manage;
