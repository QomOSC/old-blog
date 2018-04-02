import React, { Component } from 'react';

import Article from 'Root/components/Utils/Article';

class Articles extends Component {
  render() {
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
