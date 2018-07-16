import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import settings from 'utils/settings';
import log from 'utils/logger';
import { sessionSelectors } from 'ducks/session';

const PrivateRoute = ({ component: Component, authenticated, ...rest }) => {
  return (
    <Route {...rest} render={(props) => (
      authenticated? <Component {...props} isPrivate={true} />:defaultRoute(rest.path)
    )} />
  )
}

function defaultRoute(toRedirect) {
  let route = settings.PRIVATE_ROUTE_KICK_TO;
  if (toRedirect) {
    route += `?redirect=${encodeURI(toRedirect)}`
  }
  log.info(`PrivateRoute kicked-out unauthorized user on ${toRedirect}`);
  return <Redirect to={route} />;
}

const mapStateToProps = state => {
  return {
    authenticated: sessionSelectors.isAuthenticated(state)
  }
}

export default connect(mapStateToProps, null)(PrivateRoute);
