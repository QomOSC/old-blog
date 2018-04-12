import React, { Component } from 'react';
import izitoast from 'izitoast';

import contact from 'Root/actions/contact';

import { email } from 'Root/js/validator';
import bind from 'Root/js/bind';
import gql from 'Root/js/gql';

import LoadingProgress from 'Root/components/Utils/LoadingProgress';
import Article from 'Root/components/Utils/Article';
import Button from 'Root/components/Utils/Button';
import Box from 'Root/components/Utils/Box';

import styles from './index.less';


class Home extends Component {
  state = {
    articles: undefined
  };

  componentDidMount() {
    const query = `
      query {
        articles(type: 2) {
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
    `;

    gql(query).then(data => {
      this.setState({ articles: data.data.articles });
    });
  }

  @bind
  contact() {
    if (
      !this.refs.name.value ||
      !this.refs.email.value ||
      !this.refs.decs.value
    ) {
      izitoast.warning({
        rtl: true,
        title: 'مقادیر کافی نمیباشد'
      });

      return;
    }

    if (!email(this.refs.email.value)) {
      izitoast.warning({
        rtl: true,
        title: 'ایمیل صحیح نمیباشد'
      });

      return;
    }

    contact({
      name: this.refs.name.value,
      email: this.refs.email.value,
      decs: this.refs.decs.value
    });
  }

  render() {
    if (!this.state.articles) {
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

        {this.state.articles.length ? <h2>مقالات اخیر</h2> : '' }

        <div className={styles.articles}>
          {this.state.articles.map((v, i) =>
            <Article
              key={i}
              user={{ ...v.user }}
              art={{ ...v }}
              id={v._id}
            />
          )}
        </div>

        <Box>
          <div className={styles.contact}>
            <div>
              <h1>تماس با ما</h1>
              <p>مهمترین عضو تیم ما شما هستید!</p>
              <p>دوست داریم پیشنهادات و انتقادات شما را بشنویم</p>
              <p>حتما با ما در تماس باشید</p>
            </div>

            <div>
              <input
                type='text'
                ref='name'
                placeholder='نام'
              />
              <input
                type='email'
                ref='email'
                placeholder='ایمیل'
              />
              <textarea
                ref='decs'
                placeholder='توضیحات'
              />
              <Button
                handleClick={this.contact}
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
