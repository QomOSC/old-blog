import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import LoginRoute from 'Root/components/Perm/login';
import Header from './Includes/Header';
import Footer from './Includes/Footer';

import NotFound from 'Root/components/NotFound';
import Unsubscribe from './Unsubscribe';
import Conferences from './Conferences';
import Subscribe from './Subscribe';
import Recovery from './Recovery';
import Articles from './Articles';
import Activate from './Activate';
import Signup from './Signup';
import Login from './Login';
import About from './About';
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
            <LoginRoute path='/activate/:code' component={Activate} />
            <Route path='/subscribe' component={Subscribe} />
            <Route path='/conferences' component={Conferences} />
            <Route path='/unsubscribe' component={Unsubscribe} />
            <Route path='/tag/:tagname' component={Tag} />
            <Route path='/articles' component={Articles} />
            <Route path='/user/:username' component={User} />
            <Route path='/about' component={About} />
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
