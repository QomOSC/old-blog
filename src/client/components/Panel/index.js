import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import Header from './Includes/Header';

import Articles from './Articles';
import Setting from './Setting';
import Home from './HomePanel';
import Manage from './Manage';


class Panel extends Component {
  render() {
    return (
      <div>
        <Header />

        <Switch>
          <Route path='/panel/articles' component={Articles} />
          <Route path='/panel/manage' component={Manage} />
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
