import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import Header from './Includes/Header';
import Footer from './Includes/Footer';

import NotFound from 'Root/components/NotFound';
import Contact from './Contact';
import Signup from './Signup';
import Login from './Login';
import Home from './Home';

import styles from './index.less';

class Public extends Component {
  render() {
    return (
      <div>
        <Header />

        <div className={styles.content}>
          <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path='/login' component={Login} />
            <Route exact path='/signup' component={Signup} />
            <Route exact path='/contact' component={Contact} />
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
