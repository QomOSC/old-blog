import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import gql from 'Root/js/gql';

import LoadingProgress from 'Root/components/Utils/LoadingProgress';
import Article from 'Root/components/Utils/Article';
import Button from 'Root/components/Utils/Button';

import styles from './index.less';


class Manage extends Component {
  state = {
    data: undefined
  };

  componentDidMount() {
    const query = `
      query {
        articles(type: 1) {
          _id
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
        {this.state.data.articles.length ?
          <h1>مقالات جدید</h1> :
          <h1>مقاله جدیدی وجود ندارد</h1>
        }

        <div className={styles.articles}>
          {this.state.data.articles.map((v, i) =>
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
                <Button
                  color='blue'
                >
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
