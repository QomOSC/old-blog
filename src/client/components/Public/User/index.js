import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

class User extends Component {
  state = {
    data: null
  };

  componentDidMount() {
    fetch('/checklogin')
      .then(res => res.json())
      .then(data => {
        this.setState({ data });
      });
  }

  render() {
    console.log(this.props);

    if (!this.state.data) {
      return <h1>Fetchin</h1>;
    }

    console.log(this.state.data);
    
    return (
      <p>Hello</p>
    );
  }
}

export default withRouter(User);
