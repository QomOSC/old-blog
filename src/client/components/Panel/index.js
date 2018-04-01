import React, { Component } from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';

import Header from './Includes/Header';

import Setting from './Setting';
import Home from './HomePanel';


class Panel extends Component {
  render() {
    return (
      <div>
        <Header />

        <Switch>
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
