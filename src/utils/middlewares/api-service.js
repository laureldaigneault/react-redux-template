import log from 'utils/logger';
import settings from 'utils/settings';
import history from 'utils/history';
import { sessionTypes } from 'ducks/session';

const baseUrl = process.env.REACT_APP_API_HOST;

const apiService = store => next => action => {
  const result = next(action);
  if (!action.meta || !action.meta.async) {
    return result;
  }

  const { path, fullpath, authenticated, preventKickout, method = "GET", body } = action.meta;

  if (!path && !fullpath) {
    throw new Error( `'path' or 'fullpath' not specified for async action ${ action.type }` );
  }

  if (path && fullpath) {
    throw new Error( `both 'path' and 'fullpath' were specified for async action ${ action.type }, please specify only 1` );
  }

  const url = fullpath?fullpath:`${ baseUrl }${ path }`;
  const headers = {};

  if (authenticated) {
    headers['x-access-token'] = store.getState().session.token;
  }
  const request = new Request(url, {
    method,
    body,
    headers
  });

  return fetch(request).then(res => {
    if (res.ok) return res;
    const errorPayload = {
      response: res,
      status: res.status,
      body: res.body
    };
    if (res.status === 401) {
      errorPayload.type = 'Unauthorized';
      next({type: sessionTypes.RESET_TOKEN}); //resetting the session
      if (!preventKickout) {
        log.info('api-service kicked-out user upon initialization');
        history.push(settings.DEFAULT_ROUTE);
      }
    }
    return handleError(errorPayload, action, next);
  })
};

export default apiService;

function handleError(payload, action, next) {
    next({
        type: `${ action.type }_FAILED`,
        payload,
        meta: action.meta,
    });
    log.error(payload, `${action.type} fetch failed. Error code: ${payload.type}`);
    return Promise.reject(payload);
}
