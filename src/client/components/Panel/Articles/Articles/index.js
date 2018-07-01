import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import deleteArticle from 'Root/actions/user/articles/delete';
import types from 'Root/actions';

import LoadingProgress from 'Root/components/Utils/LoadingProgress';
import Article from 'Root/components/Utils/Article';
import Button from 'Root/components/Utils/Button';

import assure from 'Root/js/assure';
import bind from 'Root/js/bind';
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
            content
            minutes
            avatar
            title
            _id
          }
        }
      }
    `;

    gql(query).then(data => {
      this.props.dispatch({
        type: types.articles.LOAD,
        data: data.data.user.userArticles
      });

      this.setState({ data: data.data });
    });
  }

  @bind
  deleteArticle(id) {
    return () => {
      assure(() => {
        this.props.dispatch(deleteArticle(id));
      });
    };
  }

  render() {
    if (!this.state.data) {
      return <LoadingProgress />;
    }

    return (
      <div className={styles.container}>
        <h1 className={styles.title}>
          {this.props.articles.length ?
            'مقالات شما' :
            'شما مقاله ای ندارید'
          }
        </h1>
        <div className={styles.articles}>
        {this.props.articles.map((v, i) =>
          <Article
            key={i}
            user={this.state.data.user}
            art={v}
            id={v._id}
          >
            <div className={styles.buttons}>
              <Button
                color='red'
                handleClick={this.deleteArticle(v._id)}
              >
                حذف
              </Button>

              <Link to={`/panel/articles/edit/${v._id}`}>
                <Button
                  color='blue'>
                    تغییر دادن
                  </Button>
              </Link>
            </div>
          </Article>
        )}
        </div>
      </div>
    );
  }
}

export default connect(
  state => ({
    articles: state.articles
  })
)(Articles);
