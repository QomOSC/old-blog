import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import Verify from './Verify';


class Subscribe extends Component {
  render() {
    return (
      <Switch>
        <Route path='/subscribe/verify/:token' component={Verify} />
        <Route>
          <Redirect to='/notfound' />
        </Route>
      </Switch>
    );
  }
}

export default Subscribe;
