import React, { Component } from 'react';
import { createApolloFetch } from 'apollo-fetch';
import nprogress from 'nprogress';

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

    const apolloFetch = createApolloFetch({
      uri: `${location.origin}/graphql`
    });

    const query = `
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
    `;

    apolloFetch({ query }).then(data => {
      this.setState({ data: data.data });
      nprogress.done();
    });
  }

  render() {
    if (!this.state.data) {
      return <h1>در حال گرفتن اطلاعات</h1>;
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
