import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';

import Public from './Public';


class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path='/' component={Public} />
        </Switch>
      </Router>
    );
  }
}

export default App;
