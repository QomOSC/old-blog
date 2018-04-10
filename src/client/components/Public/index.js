import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import LoginRoute from 'Root/components/Perm/login';
import Header from './Includes/Header';
import Footer from './Includes/Footer';

import NotFound from 'Root/components/NotFound';
import Recovery from './Recovery';
import Articles from './Articles';
import Signup from './Signup';
import Login from './Login';
import Home from './Home';
import User from './User';
import Tag from './Tag';

import styles from './index.less';


class Public extends Component {
  render() {
    return (
      <div>
        <Header />

        <div className={styles.content}>
          <Switch>
            <Route exact path='/' component={Home} />
            <LoginRoute exact path='/login' component={Login} />
            <LoginRoute exact path='/signup' component={Signup} />
            <LoginRoute path='/recovery' component={Recovery} />
            <Route path='/tag/:tagname' component={Tag} />
            <Route path='/articles' component={Articles} />
            <Route path='/user/:username' component={User} />
            <Route path='/notfound' component={NotFound} />
            <Route>
              <Redirect to='/notfound' />
            </Route>
          </Switch>
        </div>

        <Footer />
      </div>
    );
  }
}

export default Public;
