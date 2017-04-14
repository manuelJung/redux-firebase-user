import * as t from '../actionTypes'

import loginHandler, * as fromLoginHandler from './loginHandler'
import signupHandler, * as fromSignupHandler from './signupHandler'
import logoutHandler, * as fromLogoutHandler from './logoutHandler'


const defaultState = {
  user          : null,
  loginHandler  : undefined,
  signupHandler : undefined,
  logoutHandler : undefined
}

export const updaters = {
  clearUser : (state) => ({ ...state, user: null }),
  setUser   : (state, payload) => ({ ...state, user: payload })
}

export default function reducer (state = defaultState, action) {
  switch (action.type) {
    
    // case t.FETCH_LOGIN_SUCCESS: return { 
    //   ...state, 
    //   user         : action.payload,
    //   loginHandler : loginHandler(state.loginHandler, action)
    // }
    
    // case t.FETCH_LOGOUT_SUCCESS: return {
    //   ...state, 
    //   user          : null,
    //   logoutHandler : loginHandler(state.loginHandler, action)
    // }
    
    case t.FETCH_LOGIN_SUCCESS: return { 
      ...updaters.setUser(state, action.payload),
      loginHandler : loginHandler(state.loginHandler, action)
    }
    
    case t.FETCH_LOGOUT_SUCCESS: return {
      ...updaters.clearUser(state),
      logoutHandler : loginHandler(state.loginHandler, action)
    }
    
    default: return {
      ...state,
      loginHandler  : loginHandler(state.loginHandler, action),
      logoutHandler : logoutHandler(state.logoutHandler, action),
      signupHandler : signupHandler(state.signupHandler, action)
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
  
  loginHandler  : mapSelectors(fromLoginHandler.selectors, 'loginHandler'),
  logoutHandler : mapSelectors(fromLogoutHandler.selectors, 'logoutHandler'),
  signupHandler : mapSelectors(fromSignupHandler.selectors, 'signupHandler')
}
