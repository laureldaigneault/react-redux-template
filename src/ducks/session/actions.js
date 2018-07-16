import * as types from './types';

export const authenticate = ({method, username, email, password}) => ({
  type: types.AUTHENTICATE,
  meta: {
      async: true,
      fullpath: 'https://httpstat.us/200',
      method: "POST",
      body: {
        method,
        username,
        email,
        password
      }
  }
});

export const resetSession = () => ({
  type: types.RESET_SESSION
})

export const setToken = token => ({
  type: types.SET_TOKEN,
  payload: {
    token
  }
})

export const resetToken = () => ({
  type: types.RESET_TOKEN
})

//validates the token that has been stored in the session duck
export const validateStoredToken = () => ({
  type: types.VALIDATE_TOKEN,
  meta: {
      async: true,
      authenticated: true, //specified to the api-service to pass the token in the header
      preventKickout: true, //exceptionally, we don't want to redirect to login here, since privateRoute will handle it
      fullpath: 'https://httpstat.us/200',
      method: "GET",
  }
})

export const initializationCompleted = () => ({
  type: types.INITIALIZATION_COMPLETED,
})

export const fetchAccount = (token) => ({
  type: types.FETCH_ACCOUNT_WITH_TOKEN,
  meta: {
      async: true,
      authenticated: true,
      fullpath: 'https://httpstat.us/200',
      method: "GET"
  }
});

export const fetchIdentity = (token) => ({
  type: types.FETCH_IDENTITY_WITH_TOKEN,
  meta: {
      async: true,
      authenticated: true,
      fullpath: 'https://httpstat.us/200',
      method: "GET"
  }
});

export const setUserData = (account, identity) => ({
  type: types.SET_USER_DATA,
  payload: {
    account,
    identity
  }
})
