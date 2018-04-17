import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import AdminRoute from 'Root/components/Perm/admin';

import MyConferences from './Conferences';
import Manage from './Manage';
import Add from './Add';


class Conferences extends Component {
  render() {
    return (
      <Switch>
        <Route exact path='/panel/conferences/Add' component={Add} />
        <AdminRoute exact path='/panel/conferences/manage' component={Manage} />
        <Route path='/panel/conferences' component={MyConferences} />
        <Route>
          <Redirect to='/notfound' />
        </Route>
      </Switch>
    );
  }
}

export default Conferences;
