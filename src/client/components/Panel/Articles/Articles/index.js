import React, { Component } from 'react';
import { createApolloFetch } from 'apollo-fetch';
import nprogress from 'nprogress';

import Article from 'Root/components/Utils/Article';

class Articles extends Component {
  state = {
    data: undefined
  };

  componentWillMount() {
    nprogress.start();
  }

  componentDidMount() {

    const apolloFetch = createApolloFetch({
      uri: `${location.origin}/graphql`
    });

    const query = `
      query {
        userself {
          name
        }
      }
    `;

    apolloFetch({ query }).then(data => {
      console.log(data);
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

    return (
      <Article
        user={{ avatar: 'aaa', username: 'matin', name: 'متین' }}
        art={{
          createdAt: 'سه روز پیش',
          minutes: 'سه دقیقه',
          title: 'چرا باید نحوه زندگی کردنمان را تغییر دهیم',
          avatar: 'aaa'
        }}
      />
    );
  }
}

export default Articles;
