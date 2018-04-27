import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import Promote from './Promote';
import Remove from './Remove';


class God extends Component {
  render() {
    return (
      <Switch>
        <Route exact path='/panel/god/remove' component={Remove} />
        <Route path='/panel/god/promote' component={Promote} />
        <Route>
          <Redirect to='/notfound' />
        </Route>
      </Switch>
    );
  }
}

export default God;
