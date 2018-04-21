import React, { Component } from 'react';
import izitoast from 'izitoast';

import contact from 'Root/actions/contact/contact';

import { email } from 'Root/js/validator';
import bind from 'Root/js/bind';
import gql from 'Root/js/gql';

import LoadingProgress from 'Root/components/Utils/LoadingProgress';
import Article from 'Root/components/Utils/Article';
import Button from 'Root/components/Utils/Button';
import Box from 'Root/components/Utils/Box';

import styles from './index.less';
import qomosc from 'Root/images/qomosc.png';

class Home extends Component {
  state = {
    articles: undefined
  };

  componentDidMount() {
    const query = `
      query {
        articles(type: 2, limit: 10) {
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
      !this.refs.description.value
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
      description: this.refs.description.value
    });

    this.refs.name.value = '';
    this.refs.email.value = '';
    this.refs.description.value = '';
  }

  render() {
    if (!this.state.articles) {
      return <LoadingProgress />;
    }

    return (
      <div className={styles.container}>
        <div className={styles.intro}>
          <img src={qomosc}/>
          <h1>جامعه متن باز قم</h1>
        </div>
        <div className={styles.description}>
          <div>
          <p>
            جامعه متن باز قم با هدف فراهم کردن محیطی برای
            به اشتراک گذاری دانش و تجربیات افرادی که در زمینه
            های مختلف متن باز فعالیت میکنند تاسیس شده است.
          </p>
        </div>
        <div>
          <h2>اهداف</h2>
          <ul>
            <li>حمایت و پشتیبانی از کاربران تکنولوژی‌های متن باز</li>
            <li>فرهنگ‌سازی استفاده از تکنولوژی‌های متن باز</li>
            <li>کمک به توسعه تکنولوژی‌های متن باز</li>
            <li> آموزش تکنولوژی‌های متن باز</li>
          </ul>
        </div>
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
                ref='description'
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
