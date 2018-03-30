import React, { Component } from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';

import Home from './HomePanel';


class Panel extends Component {
  render() {
    return (
      <div>
        <Switch>
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
