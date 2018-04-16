import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import MyConferences from './Conferences';

class Conferences extends Component {
  render() {
    return (
      <Switch>
        <Route exact path='/panel/conferences' component={MyConferences} />
        <Route>
          <Redirect to='/notfound' />
        </Route>
      </Switch>
    );
  }
}

export default Conferences;
