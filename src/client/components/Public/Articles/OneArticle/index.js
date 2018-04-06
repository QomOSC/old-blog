import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import MarkdownIt from 'markdown-it';

import gql from 'Root/js/gql';

import LoadingProgress from 'Root/components/Utils/LoadingProgress';

const md = new MarkdownIt();

class ArticlesHome extends Component {
  state = {
    data: undefined
  };

  componentDidMount() {
    const query = `
      query {
        article(_id: "${this.props.match.params.id}") {
          createdAt
          minutes
          content
          avatar
          title
          _id

          user {
            username
            avatar
            email
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

    if (this.state.data.article.title === null) {
      return <Redirect to='/notfound' />;
    }

    return (
      <div>
        <h1>USER</h1>
        <p>username: {this.state.data.article.user.username}</p>
        <p>email: {this.state.data.article.user.email}</p>
        <p>name: {this.state.data.article.user.name}</p>
        <p>avatar: {this.state.data.article.user.avatar}</p>
        <h1>ARTICLE</h1>
        <p>createdAt: {this.state.data.article.createdAt}</p>
        <p>minutes: {this.state.data.article.minutes}</p>
        <p>avatar: {this.state.data.article.avatar}</p>
        <p>title {this.state.data.article.title}</p>
        <div dangerouslySetInnerHTML={{
          __html: md.render(this.state.data.article.content)
        }} />
      </div>
    );
  }
}

export default ArticlesHome;
