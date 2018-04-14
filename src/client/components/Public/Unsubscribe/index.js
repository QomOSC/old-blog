import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import Code from './Code';
import Form from './Form';


class Unsubscribe extends Component {
  render() {
    return (
      <Switch>
        <Route path='/unsubscribe/:code' component={Code} />
        <Route exact path='/unsubscribe' component={Form} />
        <Route>
          <Redirect to='/notfound' />
        </Route>
      </Switch>
    );
  }
}

export default Unsubscribe;
