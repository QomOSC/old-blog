import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import Articles from './Articles';


class Article extends Component {
  render() {
    return (
      <Switch>
        <Route exact path='/panel/articles' component={Articles} />
        <Route>
          <Redirect to='/notfound' />
        </Route>
      </Switch>
    );
  }
}

export default Article;
