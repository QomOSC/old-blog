import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import LoginRoute from 'Root/components/Perm/admin';

import ManageEdit from './ManageEdit';
import Articles from './Articles';
import Comments from './Comments';
import AddArticle from './Add';
import Manage from './Manage';
import Edit from './Edit';

class Article extends Component {
  render() {
    return (
      <Switch>
        <Route exact path='/panel/articles/comments' component={Comments} />
        <Route exact path='/panel/articles/add' component={AddArticle} />
        <Route exact path='/panel/articles/edit/:id' component={Edit} />
        <LoginRoute path='/panel/articles/manage/:id' component={ManageEdit} />
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
