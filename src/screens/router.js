import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Router as ReactRouter, Route, Switch, Redirect } from 'react-router-dom';
import history from 'utils/history';
import settings from 'utils/settings';
import { sessionOperations, sessionSelectors } from 'ducks/session';

import AppLoading from 'components/AppLoading';
import PrivateRoute from 'components/PrivateRoute';
import Login from 'screens/Login';
import Home from 'screens/Home';
import Support from 'screens/Support';
import Error404 from 'screens/Error404';

class Router extends Component {
  componentWillMount() {
    this.props.initializeSession();
  }
  render() {
    const { initialized, authenticated } = this.props;

    return (
      <ReactRouter history={history}>
        <div>
          <AppLoading visible={!initialized}/>
          {initialized && (
            <Switch>
              <Route exact path="/" render={props => (
                <Redirect to={(initialized && authenticated)?settings.LOGIN_SUCCESS_ROUTE:settings.DEFAULT_ROUTE} />
              )}/>
              <Route path="/login" component={Login} />
              <PrivateRoute path="/home" component={Home} />
              <PrivateRoute path="/support" component={Support} />
              <Route path="/error404" component={Error404} />
              <Redirect to="/error404" />
            </Switch>
          )}
        </div>
      </ReactRouter>
    )
  }
}

const mapStateToProps = state => {
  return {
    initialized: sessionSelectors.isInitialized(state),
    authenticated: sessionSelectors.isAuthenticated(state)
  }
}

const mapDispatchToProps = dispatch => {
  return {
    initializeSession: () => dispatch(sessionOperations.initializeSession())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Router);
