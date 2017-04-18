'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fetchSignupFailure = exports.fetchSignupSuccess = exports.fetchSignupRequest = undefined;

var _actionTypes = require('../actionTypes');

var t = _interopRequireWildcard(_actionTypes);

var _config = require('../config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var fetchSignupRequest = exports.fetchSignupRequest = function fetchSignupRequest(email, password) {
  return {
    type: t.FETCH_SIGNUP_REQUEST,
    meta: { email: email, password: password }
  };
};

var fetchSignupSuccess = exports.fetchSignupSuccess = function fetchSignupSuccess(email, password, payload) {
  return {
    type: t.FETCH_SIGNUP_SUCCESS,
    meta: { email: email, password: password },
    payload: payload
  };
};

var fetchSignupFailure = exports.fetchSignupFailure = function fetchSignupFailure(email, password, error) {
  return {
    type: t.FETCH_SIGNUP_FAILURE,
    meta: { email: email, password: password },
    error: true,
    payload: error
  };
};

exports.default = function (email, password) {
  return function (dispatch) {
    dispatch(fetchSignupRequest(email, password));

    var auth = _config2.default.getConfig().firebase.auth();

    return auth.createUserWithEmailAndPassword(email, password).then(function (response) {
      dispatch(fetchSignupSuccess(email, password, response));
      return response;
    }).catch(function (error) {
      dispatch(fetchSignupFailure(email, password, error));
      return error;
    });
  };
};