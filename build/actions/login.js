'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.loginWithTwitter = exports.loginWithGithub = exports.loginWithFacebook = exports.loginWithGoogle = exports.fetchLoginFailure = exports.fetchLoginSuccess = exports.fetchLoginRequest = undefined;

var _actionTypes = require('../actionTypes');

var t = _interopRequireWildcard(_actionTypes);

var _config = require('../config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var fetchLoginRequest = exports.fetchLoginRequest = function fetchLoginRequest(method) {
  return {
    type: t.FETCH_LOGIN_REQUEST,
    meta: { method: method }
  };
};

var fetchLoginSuccess = exports.fetchLoginSuccess = function fetchLoginSuccess(payload, method) {
  return {
    type: t.FETCH_LOGIN_SUCCESS,
    meta: { method: method },
    payload: payload
  };
};

var fetchLoginFailure = exports.fetchLoginFailure = function fetchLoginFailure(error, method) {
  return {
    type: t.FETCH_LOGIN_FAILURE,
    meta: { method: method },
    payload: error
  };
};

exports.default = function (email, password) {
  return function (dispatch) {
    var method = 'EMAIL_AND_PASSWORD';
    var auth = _config2.default.getConfig().firebase.auth;

    dispatch(fetchLoginRequest(method));

    return auth().signInWithEmailAndPassword(email, password).then(function (response) {
      dispatch(fetchLoginSuccess(response, method));
      return response;
    }).catch(function (response) {
      var error = {
        code: response.code || 'auth/unkown-error',
        message: response.message || 'An unkown Error appeard'
      };
      dispatch(fetchLoginFailure(error, method));
      return error;
    });
  };
};

var authOLogin = function authOLogin(args) {
  return function (dispatch) {
    var method = args.method;
    var auth = _config2.default.getConfig().firebase.auth;
    var request = args.requestType === 'redirect' ? function () {
      auth().signInWithRedirect(args.provider);
      return auth().getRedirectResult();
    } : function () {
      return auth().signInWithPopup(args.provider);
    };

    dispatch(fetchLoginRequest(method));

    return request().then(function (response) {
      dispatch(fetchLoginSuccess(response, method));
      return response.user;
    }).catch(function (response) {
      var error = {
        code: response.code || 'auth/unkown-error',
        message: response.message || 'An unkown Error appeard'
      };
      dispatch(fetchLoginFailure(error, method));
      return error;
    });
  };
};

var loginWithGoogle = exports.loginWithGoogle = function loginWithGoogle(args) {
  return function (dispatch) {
    var method = 'GOOGLE_AUTH_O';
    var auth = _config2.default.getConfig().firebase.auth;
    var provider = new auth.GoogleAuthProvider();

    return authOLogin({
      method: method,
      provider: provider,
      requestType: args ? args.requestType : ''
    })(dispatch);
  };
};

var loginWithFacebook = exports.loginWithFacebook = function loginWithFacebook(args) {
  return function (dispatch) {
    var method = 'FACEBOOK_AUTH_O';
    var auth = _config2.default.getConfig().firebase.auth;
    var provider = new auth.FacebookAuthProvider();

    return authOLogin({
      method: method,
      provider: provider,
      requestType: args ? args.requestType : ''
    })(dispatch);
  };
};

var loginWithGithub = exports.loginWithGithub = function loginWithGithub(args) {
  return function (dispatch) {
    var method = 'GITHUB_AUTH_O';
    var auth = _config2.default.getConfig().firebase.auth;
    var provider = new auth.GithubAuthProvider();

    return authOLogin({
      method: method,
      provider: provider,
      requestType: args ? args.requestType : ''
    })(dispatch);
  };
};

var loginWithTwitter = exports.loginWithTwitter = function loginWithTwitter(args) {
  return function (dispatch) {
    var method = 'TWITTER_AUTH_O';
    var auth = _config2.default.getConfig().firebase.auth;
    var provider = new auth.TwitterAuthProvider();

    return authOLogin({
      method: method,
      provider: provider,
      requestType: args ? args.requestType : ''
    })(dispatch);
  };
};