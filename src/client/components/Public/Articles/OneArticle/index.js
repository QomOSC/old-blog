import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import nprogress from 'nprogress';

import gql from 'Root/js/gql';

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
      return <div className='loadingContainer'>
        <div className="sk-fading-circle">
          <div className="sk-circle1 sk-circle" />
          <div className="sk-circle2 sk-circle" />
          <div className="sk-circle3 sk-circle" />
          <div className="sk-circle4 sk-circle" />
          <div className="sk-circle5 sk-circle" />
          <div className="sk-circle6 sk-circle" />
          <div className="sk-circle7 sk-circle" />
          <div className="sk-circle8 sk-circle" />
          <div className="sk-circle9 sk-circle" />
          <div className="sk-circle10 sk-circle" />
          <div className="sk-circle11 sk-circle" />
          <div className="sk-circle12 sk-circle" />
        </div>
      </div>;
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
