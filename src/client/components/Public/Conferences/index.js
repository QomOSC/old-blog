import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import Conference from './OneConference';
import Home from './HomeConferences';

class Conferences extends Component {
  render() {
    return (
      <Switch>
        <Route exact path='/conferences' component={Home} />
        <Route path='/conferences/:id' component={Conference} />
        <Route>
          <Redirect to='/notfound' />
        </Route>
      </Switch>
    );
  }
}

export default Conferences;
