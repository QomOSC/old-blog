import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import AdminRoute from 'Root/components/Perm/admin';
import GodRoute from 'Root/components/Perm/god';
import Header from './Includes/Header';

import Conferences from './Conferences';
import Articles from './Articles';
import Comments from './Comments';
import Setting from './Setting';
import Home from './HomePanel';
import Manage from './Manage';
import God from './God';


class Panel extends Component {
  render() {
    return (
      <div>
        <Header />

        <Switch>
          <AdminRoute exact path='/panel/comments' component={Comments} />
          <Route path='/panel/conferences' component={Conferences} />
          <Route path='/panel/articles' component={Articles} />
          <AdminRoute path='/panel/manage' component={Manage} />
          <GodRoute path='/panel/god' component={God} />
          <Route exact path='/panel/setting' component={Setting} />
          <Route exact path='/panel' component={Home} />
          <Route>
            <Redirect to='/notfound' />
          </Route>
        </Switch>
      </div>
    );
  }
}

export default Panel;
