import React, { Component } from 'react';

class Edit extends Component {
  render() {
    console.log(this.props.match.params.id);
    return <h1>Edit</h1>;
  }
}

export default Edit;
