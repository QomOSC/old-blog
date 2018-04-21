import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import AdminRoute from 'Root/components/Perm/admin';

import MyConferences from './Conferences';
import Attenders from './Attenders';
import Gallery from './Gallery';
import Edit from './ManageEdit';
import Manage from './Manage';
import Video from './Video';
import Add from './Add';


class Conferences extends Component {
  render() {
    return (
      <Switch>
        <Route exact path='/panel/conferences/Add' component={Add} />
        <AdminRoute path='/panel/conferences/gallery/:id' component={Gallery} />
        <AdminRoute path='/panel/conferences/manage/:id' component={Edit} />
        <AdminRoute exact path='/panel/conferences/manage' component={Manage} />
        <AdminRoute path='/panel/conferences/video/:id' component={Video} />
        <AdminRoute
          exact
          component={Attenders}
          path='/panel/conferences/attenders/:id'
        />
        <Route path='/panel/conferences' component={MyConferences} />
        <Route>
          <Redirect to='/notfound' />
        </Route>
      </Switch>
    );
  }
}

export default Conferences;
