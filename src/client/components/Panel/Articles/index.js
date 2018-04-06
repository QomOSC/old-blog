import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import LoginRoute from 'Root/components/Perm/admin';

import AddArticle from './Add';
import Articles from './Articles';
import Manage from './Manage';

class Article extends Component {
  render() {
    return (
      <Switch>
        <Route exact path='/panel/articles/add' component={AddArticle} />
        <LoginRoute exact path='/panel/articles/manage' component={Manage} />
        <Route exact path='/panel/articles' component={Articles} />
        <Route>
          <Redirect to='/notfound' />
        </Route>
      </Switch>
    );
  }
}

export default Article;
