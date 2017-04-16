import * as t from '../actionTypes'

import loginRequest, * as fromLoginRequest from './loginRequest'
import signupRequest, * as fromSignupRequest from './signupRequest'
import logoutRequest, * as fromLogoutRequest from './logoutRequest'


const defaultState = {
  user          : null,
  loginRequest  : undefined,
  signupRequest : undefined,
  logoutRequest : undefined
}

export const updaters = {
  clearUser : (state) => ({ ...state, user: null }),
  setUser   : (state, payload) => ({ ...state, user: payload })
}

export default function reducer (state = defaultState, action) {
  switch (action.type) {
    
    case t.FETCH_LOGIN_SUCCESS: return { 
      ...updaters.setUser(state, action.payload),
      loginRequest : loginRequest(state.loginRequest, action)
    }
    
    case t.FETCH_LOGOUT_SUCCESS: return {
      ...updaters.clearUser(state),
      logoutRequest : loginRequest(state.loginRequest, action)
    }

    case t.FETCH_SIGNUP_SUCCESS: return {
      ...updaters.setUser(state, action.payload),
      signupRequest : signupRequest(state.signupRequest, action)
    }
    
    default: return {
      ...state,
      loginRequest  : loginRequest(state.loginRequest, action),
      logoutRequest : logoutRequest(state.logoutRequest, action),
      signupRequest : signupRequest(state.signupRequest, action)
    }
  }
}


const mapSelectors = (selectors, key) => Object.keys(selectors).reduce(
  (prev, next) => Object.assign(prev, {
    [next]: (state, ...rest) => selectors[next](state[key], ...rest)
  }), {}
)




export const selectors = {
  getUser     : (state) => state.user,
  isLoggedIn  : (state) => !!state.user,
  
  loginRequest  : mapSelectors(fromLoginRequest.selectors, 'loginRequest'),
  logoutRequest : mapSelectors(fromLogoutRequest.selectors, 'logoutRequest'),
  signupRequest : mapSelectors(fromSignupRequest.selectors, 'signupRequest')
}
