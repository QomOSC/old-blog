import React, { Component } from 'react';

import gql from 'Root/js/gql';

class Comments extends Component {
  componentDidMount() {
    const query = `
      query {
        comment (myArticles: true, contact: false) {
          description
          email
          name
          _id

          articleData {
            title
            avatar
          }
        }
      }
    `;

    gql(query).then(data => {
      console.log(data);
    });
  }

  render() {
    return (
      <div>
        <h1>Hello babe</h1>
      </div>
    );
  }
}

export default Comments;
