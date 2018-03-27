import React, { Component } from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';

import HomeU from './HomeU';


class U extends Component {
  render() {
    return (
      <Switch>
        <Route exact path='/panel' component={HomeU} />
        <Route>
          <Redirect to='/notfound' />
        </Route>
      </Switch>
    );
  }
}

export default U;
