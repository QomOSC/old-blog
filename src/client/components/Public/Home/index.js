import React, { Component } from 'react';
import nprogress from 'nprogress';

import gql from 'Root/js/gql';

import LoadingProgress from 'Root/components/Utils/LoadingProgress';
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

    gql(query).then(data => {
      this.setState({ data: data.data });
      nprogress.done();
    });
  }

  render() {
    if (!this.state.data) {
      return <LoadingProgress />;
    }

    return (
      <div className={styles.container}>
        <div className={styles.intro}>
          <h2>به جامعه متن باز قم خوش آمدید</h2>
          <p>
            جامعه متن باز قم با هدف فراهم کردن محیطی برای
            به اشتراک گذاری دانش و تجربیات افرادی که در زمینه
            های مختلف متن باز فعالیت میکنند تاسیس شده است.
          </p>

          <br />

          <h2>اهداف</h2>
          <ul>
            <li>حمایت و پشتیبانی از کاربران تکنولوژی‌های متن باز</li>
            <li>فرهنگ‌سازی استفاده از تکنولوژی‌های متن باز</li>
            <li>کمک به توسعه تکنولوژی‌های متن باز</li>
            <li> آموزش تکنولوژی‌های متن باز</li>
          </ul>
        </div>

        <div className={styles.articles}>
          {this.state.data.articles.map((v, i) =>
            <Article
              key={i}
              user={{ ...v.user }}
              art={{ ...v }}
            />
          )}
        </div>

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
