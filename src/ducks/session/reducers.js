import { combineReducers } from 'redux';
import { REHYDRATE } from 'redux-persist';
import * as operations from './operations';
import * as types from './types';

/* State Shape
{
  token: string
  initialized: bool   - defines if the session/app has been initialized (token validated, and other stuff fetched)
  account: Object     - account data of the user
  identity: Object    - identity data of the user
}
*/

const initialState = {
  token: null,
  initialized: false
}

const sessionReducer = (state = {}, action) => {
  switch(action.type) {
    case types.INITIALIZATION_COMPLETED: {
      return {
        ...state,
        initialized: true
      }
    }

    case types.RESET_SESSION: {
      return {
        ...state,
        token: null,
        account: null,
        identity: null
      };
    }

    case types.SET_TOKEN: {
      const { token } = action.payload;
      return {
        ...state,
        token
      }
    }

    case types.SET_USER_DATA: {
      const { account, identity } = action.payload;

      return {
        ...state,
        account,
        identity
      }
    }

    case types.RESET_TOKEN: {
      return {
        ...state,
        token: null
      }
    }

    default: return state;
  }
}

const reducer = sessionReducer; //or combineReducers if there is more than 1

export default reducer;
