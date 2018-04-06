import React, { Component } from 'react';

import gql from 'Root/js/gql';


class Manage extends Component {
  componentDidMount() {
    const query = `
      query {
        articles(type: 1) {
          title
        }
      }
    `;

    gql(query).then(data => {
      console.log(data);
    });
  }

  render() {
    return (
      <h1>Manage</h1>
    );
  }
}

export default Manage;
