'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getSignupFetchError = exports.signupFetchFailed = exports.isFetchingSignup = exports.getLogoutFetchError = exports.logoutFetchFailed = exports.isFetchingLogout = exports.getLoginFetchError = exports.loginFetchFailed = exports.isFetchingLogin = exports.isLoggedIn = exports.getUser = undefined;

var _reducer = require('./reducer');

var _config = require('./config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var mapReducerKey = function mapReducerKey(selector, state) {
  for (var _len = arguments.length, rest = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
    rest[_key - 2] = arguments[_key];
  }

  return selector.apply(undefined, [state[_config2.default.getConfig().reducerKey]].concat(rest));
};

// --------------------------------
// USER
// --------------------------------

/**
 * returns null if user is not logged in
 * return the current user, if user is logged in
 * @return null || object
 */
var getUser = exports.getUser = function getUser() {
  for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
    args[_key2] = arguments[_key2];
  }

  return mapReducerKey.apply(undefined, [_reducer.selectors.getUser].concat(args));
};

/**
 * returns wheter or not the user is currently logged in
 * @return bool
 */
var isLoggedIn = exports.isLoggedIn = function isLoggedIn() {
  for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
    args[_key3] = arguments[_key3];
  }

  return mapReducerKey.apply(undefined, [_reducer.selectors.isLoggedIn].concat(args));
};

// --------------------------------
// LOGIN
// --------------------------------

/**
 * returns whether or not the user is currently fetched
 * @return bool
 */
var isFetchingLogin = exports.isFetchingLogin = function isFetchingLogin() {
  for (var _len4 = arguments.length, args = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
    args[_key4] = arguments[_key4];
  }

  return mapReducerKey.apply(undefined, [_reducer.selectors.loginHandler.isFetching].concat(args));
};

/**
 * returns whether or not the last user fetch returned a network error
 * @return bool
 */
var loginFetchFailed = exports.loginFetchFailed = function loginFetchFailed() {
  for (var _len5 = arguments.length, args = Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
    args[_key5] = arguments[_key5];
  }

  return mapReducerKey.apply(undefined, [_reducer.selectors.loginHandler.fetchFailed].concat(args));
};

/**
 * returns the error message, if the last user fetch returns a network error
 * @return string
 */
var getLoginFetchError = exports.getLoginFetchError = function getLoginFetchError() {
  for (var _len6 = arguments.length, args = Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
    args[_key6] = arguments[_key6];
  }

  return mapReducerKey.apply(undefined, [_reducer.selectors.loginHandler.getError].concat(args));
};

// --------------------------------
// LOGOUT
// --------------------------------

/**
 * returns whether or not the user is currently logging out
 * @return bool
 */
var isFetchingLogout = exports.isFetchingLogout = function isFetchingLogout() {
  for (var _len7 = arguments.length, args = Array(_len7), _key7 = 0; _key7 < _len7; _key7++) {
    args[_key7] = arguments[_key7];
  }

  return mapReducerKey.apply(undefined, [_reducer.selectors.logoutHandler.isFetching].concat(args));
};

/**
 * returns whether or not the last user logout returned a network error
 * @return bool
 */
var logoutFetchFailed = exports.logoutFetchFailed = function logoutFetchFailed() {
  for (var _len8 = arguments.length, args = Array(_len8), _key8 = 0; _key8 < _len8; _key8++) {
    args[_key8] = arguments[_key8];
  }

  return mapReducerKey.apply(undefined, [_reducer.selectors.logoutHandler.fetchFailed].concat(args));
};

/**
 * returns the error message, if the last user logout returns a network error
 * @return string
 */
var getLogoutFetchError = exports.getLogoutFetchError = function getLogoutFetchError() {
  for (var _len9 = arguments.length, args = Array(_len9), _key9 = 0; _key9 < _len9; _key9++) {
    args[_key9] = arguments[_key9];
  }

  return mapReducerKey.apply(undefined, [_reducer.selectors.logoutHandler.getError].concat(args));
};

// --------------------------------
// SIGNUP
// --------------------------------

/**
 * returns whether or not the user is currently signingup
 * @return bool
 */
var isFetchingSignup = exports.isFetchingSignup = function isFetchingSignup() {
  for (var _len10 = arguments.length, args = Array(_len10), _key10 = 0; _key10 < _len10; _key10++) {
    args[_key10] = arguments[_key10];
  }

  return mapReducerKey.apply(undefined, [_reducer.selectors.signupHandler.isFetching].concat(args));
};

/**
 * returns whether or not the last user signup returned a network error
 * @return bool
 */
var signupFetchFailed = exports.signupFetchFailed = function signupFetchFailed() {
  for (var _len11 = arguments.length, args = Array(_len11), _key11 = 0; _key11 < _len11; _key11++) {
    args[_key11] = arguments[_key11];
  }

  return mapReducerKey.apply(undefined, [_reducer.selectors.signupHandler.fetchFailed].concat(args));
};

/**
 * returns the error message, if the last user signup returns a network error
 * @return string
 */
var getSignupFetchError = exports.getSignupFetchError = function getSignupFetchError() {
  for (var _len12 = arguments.length, args = Array(_len12), _key12 = 0; _key12 < _len12; _key12++) {
    args[_key12] = arguments[_key12];
  }

  return mapReducerKey.apply(undefined, [_reducer.selectors.signupHandler.getError].concat(args));
};