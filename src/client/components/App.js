import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Logged from './Perm/logged';

import Public from './Public';
import Panel from './Panel';


class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Logged path='/panel' component={Panel} />
          <Route path='/' component={Public} />
        </Switch>
      </Router>
    );
  }
}

export default App;
