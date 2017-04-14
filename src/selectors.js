import { selectors as s } from './reducer'
import config from './config'

const mapReducerKey = (selector, state, ...rest) => selector(state[config.getConfig().reducerKey], ...rest)


// --------------------------------
// USER
// --------------------------------

/**
 * returns null if user is not logged in
 * return the current user, if user is logged in
 * @return null || object
 */
export const getUser = (...args) => mapReducerKey(s.getUser, ...args)

/**
 * returns wheter or not the user is currently logged in
 * @return bool
 */
export const isLoggedIn = (...args) => mapReducerKey(s.isLoggedIn, ...args)


// --------------------------------
// LOGIN
// --------------------------------

/**
 * returns whether or not the user is currently fetched
 * @return bool
 */
export const isFetchingLogin = (...args) => mapReducerKey(s.loginHandler.isFetching, ...args)

/**
 * returns whether or not the last user fetch returned a network error
 * @return bool
 */
export const loginFetchFailed = (...args) => mapReducerKey(s.loginHandler.fetchFailed, ...args)

/**
 * returns the error message, if the last user fetch returns a network error
 * @return string
 */
export const getLoginFetchError = (...args) => mapReducerKey(s.loginHandler.getError, ...args)


// --------------------------------
// LOGOUT
// --------------------------------

/**
 * returns whether or not the user is currently logging out
 * @return bool
 */
export const isFetchingLogout = (...args) => mapReducerKey(s.logoutHandler.isFetching, ...args)

/**
 * returns whether or not the last user logout returned a network error
 * @return bool
 */
export const logoutFetchFailed = (...args) => mapReducerKey(s.logoutHandler.fetchFailed, ...args)

/**
 * returns the error message, if the last user logout returns a network error
 * @return string
 */
export const getLogoutFetchError = (...args) => mapReducerKey(s.logoutHandler.getError, ...args)


// --------------------------------
// SIGNUP
// --------------------------------

/**
 * returns whether or not the user is currently signingup
 * @return bool
 */
export const isFetchingSignup = (...args) => mapReducerKey(s.signupHandler.isFetching, ...args)

/**
 * returns whether or not the last user signup returned a network error
 * @return bool
 */
export const signupFetchFailed = (...args) => mapReducerKey(s.signupHandler.fetchFailed, ...args)

/**
 * returns the error message, if the last user signup returns a network error
 * @return string
 */
export const getSignupFetchError = (...args) => mapReducerKey(s.signupHandler.getError, ...args)
