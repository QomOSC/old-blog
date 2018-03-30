import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import RecoveryHome from './RecoveryHome';
import Code from './Code';

class Recovery extends Component {
  render() {
    return (
      <Switch>
        <Route exact path='/recovery' component={RecoveryHome} />
        <Route exact path='/recovery/:code' component={Code} />
      </Switch>
    );
  }
}

export default Recovery;
