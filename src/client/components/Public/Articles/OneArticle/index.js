import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import nprogress from 'nprogress';

import gql from 'Root/js/gql';

import LoadingProgress from 'Root/components/Utils/LoadingProgress';

class ArticlesHome extends Component {
  state = {
    data: undefined
  };

  componentWillMount() {
    nprogress.start();
  }

  componentDidMount() {
    const query = `
      query {
        article(_id: "${this.props.match.params.id}") {
          title
        }
      }
    `;

    gql(query).then(data => {
      this.setState({ data: data.data });
      nprogress.done();
    });
  }

  render() {
    if (!this.state.data) {
      return <LoadingProgress />;
    }

    if (this.state.data.article.title === null) {
      return <Redirect to='/notfound' />;
    }

    console.log(this.state.data);

    return (
      <h1>One</h1>
    );
  }
}

export default ArticlesHome;
