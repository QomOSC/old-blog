import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import ToAdmin from './ToAdmin';
import ToGod from './ToGod';


class Promote extends Component {
  render() {
    return (
      <Switch>
        <Route exact path='/panel/god/promote/toadmin' component={ToAdmin} />
        <Route exact path='/panel/god/promote/togod' component={ToGod} />
        <Route>
          <Redirect to='/notfound' />
        </Route>
      </Switch>
    );
  }
}

export default Promote;
