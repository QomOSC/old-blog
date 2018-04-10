import React, { Component } from 'react';


class Tag extends Component {
  render() {
    console.log(this.props.match.params.tagname);
    return <p>Hi</p>;
  }
}

export default Tag;
