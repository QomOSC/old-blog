import { InMemoryCache } from 'apollo-cache-inmemory';
import { createHttpLink } from 'apollo-link-http';
import React, { Component } from 'react';
import ApolloClient from 'apollo-client';
import nprogress from 'nprogress';
import gql from 'graphql-tag';

import Article from 'Root/components/Utils/Article';
import Button from 'Root/components/Utils/Button';
import Box from 'Root/components/Utils/Box';

import styles from './index.less';


class Home extends Component {
  state = {
    data: undefined
  };

  componentWillMount() {
    nprogress.start();
  }

  componentDidMount() {
    const link = createHttpLink({
      uri: '/graphql',
      credentials: 'same-origin'
    });

    const client = new ApolloClient({
      cache: new InMemoryCache(),
      link
    });

    client.query({
      query: gql`
        query {
          articles {
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
      `
    }).then(data => {
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
      <div className={styles.container}>
        {this.state.data.articles.map((v, i) =>
          <Article
            key={i}
            user={{ ...v.user }}
            art={{ ...v }}
          />
        )}

        <Box>
          <div className={styles.contact}>
            <div>
              <h1>اگر سوالی دارید بپرسید</h1>
              <p>شما میتوانید تمامی انتقادات و پیشنهادات خود را ارسال کنید</p>
            </div>

            <div>
              <input
                type='text'
                refs='name'
                placeholder='نام'
              />
              <input
                type='email'
                refs='email'
                placeholder='ایمیل'
              />
              <textarea
                refs='decs'
                placeholder='توضیحات'
              />
              <Button
                color='blue'>
                ارسال
              </Button>
            </div>
          </div>
        </Box>
      </div>
    );
  }
}

export default Home;
