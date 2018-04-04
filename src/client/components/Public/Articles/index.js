import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import ArticlesHome from './ArticlesHome';
import OneArticle from './OneArticle';

class Articles extends Component {
  render() {
    return (
      <Switch>
        <Route exact path='/articles' component={ArticlesHome} />
        <Route path='/articles/:id' component={OneArticle} />
        <Route>
          <Redirect to='/notfound' />
        </Route>
      </Switch>
    );
  }
}

export default Articles;
