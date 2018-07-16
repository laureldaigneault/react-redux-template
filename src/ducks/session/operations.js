import * as actions from './actions';
import * as selectors from './selectors';
import * as types from './types';
import settings from 'utils/settings';
import history from 'utils/history';
import log from 'utils/logger';

export const login = (data, redirect) => dispatch => {
  const redirectRoute = redirect?redirect:settings.LOGIN_SUCCESS_ROUTE;

  dispatch(actions.authenticate(data)).then(result => {
    //authentication was successful
    const token = result.token || '12345'; //temporary since we don't call the api properly
    dispatch(actions.setToken(token));

    const fetchAccountPromise = dispatch(actions.fetchAccount(token));
    const fetchIdentityPromise = dispatch(actions.fetchIdentity(token));
    const steps = [fetchAccountPromise, fetchIdentityPromise];

    Promise.all(steps).then(results => {
      log.info('fetched user account and identity successfully');
      const account =  results[0];
      const identity = results[1];
      dispatch(actions.setUserData(account, identity));
      history.push(redirectRoute);
    }).catch(errors => {
      log.error('identity / account fetch failed');
    })
  }).catch(error => {
    log.error('user authentication failed');
  })
}

export const logout = (redirectBefore) => dispatch => {
  if (redirectBefore) {
    history.push(redirectBefore);
  }
  dispatch(actions.resetSession());
}

export const initializeSession = () => (dispatch, getState) => {
  const storedToken = selectors.getToken(getState())
  let steps = []

  //eventually refactor to wrap the validateStoredToken and the action to subscribe to pubsub around a promise that will resolve only when the 2 other are done
  if (storedToken) {
    log.info(`token found in localStorage, needs validation`);
    const validateTokenPromise = dispatch(actions.validateStoredToken()).catch(err => {
      log.error(`token invalid`);
      dispatch(actions.resetToken()); //token is invalid
    })
    //***** need to make the fetch below execute only if the validateTokenPromise resolves...
    const fetchAccountPromise = dispatch(actions.fetchAccount(storedToken)).catch(err => err);
    const fetchIdentityPromise = dispatch(actions.fetchIdentity(storedToken)).catch(err => err);
    steps = steps.concat([validateTokenPromise, fetchAccountPromise, fetchIdentityPromise]);
  }

  //execute all initialization steps and set the app as initialized when it completes
  Promise.all(steps).then(results => {
    if (storedToken) {
      const account = results[1];
      const identity = results[2];
      dispatch(actions.setUserData(account, identity));
    }
    dispatch(actions.initializationCompleted())
  })
}
