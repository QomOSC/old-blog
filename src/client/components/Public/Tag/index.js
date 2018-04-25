import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import gql from 'Root/js/gql';

import LoadingProgress from 'Root/components/Utils/LoadingProgress';
import Article from 'Root/components/Utils/Article';

import styles from './index.less';


class Tag extends Component {
  state = {
    articles: undefined
  }

  componentDidMount() {
    const query = `
      query {
        tag(tagname: "${this.props.match.params.tagname}") {
          articles {
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
      }
    `;

    gql(query).then(data => {
      if (data.data.tag) {
        this.setState({ articles: data.data.tag.articles });
        return;
      }

      this.props.history.push('/notfound');
    });
  }

  render() {
    if (!this.state.articles) {
      return <LoadingProgress />;
    }

    return (
      <div className={styles.container}>
        <h1 className={styles.title}>
          برچسب: {this.props.match.params.tagname}
        </h1>

        <div className={styles.articles}>
          {this.state.articles.map((v, i) =>
            <Article
              user={{ ...v.user }}
              art={{ ...v }}
              id={v._id}
              key={i}
            />
          )}
        </div>
      </div>
    );
  }
}

export default withRouter(Tag);
