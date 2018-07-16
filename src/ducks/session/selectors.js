export function getSession(state) {
  return state.session;
}

export function getUserData(state) {
  const session = getSession(state);
  const { account, identity } = session;
  return {
    ...account,
    ...identity
  }
}

export function getToken(state) {
  return getSession(state).token;
}

export function isAuthenticated(state) {
  return getSession(state).token?true:false;
}

export function isTokenValidating(state) {
  return getSession(state)._tokenRequiresValidation;
}

export function isInitialized(state) {
  return getSession(state).initialized;
}
