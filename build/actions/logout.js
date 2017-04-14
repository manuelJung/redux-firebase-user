'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fetchLogoutFailure = exports.fetchLogoutSuccess = exports.fetchLogoutRequest = undefined;

var _actionTypes = require('../actionTypes');

var t = _interopRequireWildcard(_actionTypes);

var _config = require('../config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var fetchLogoutRequest = exports.fetchLogoutRequest = function fetchLogoutRequest() {
  return {
    type: t.FETCH_LOGOUT_REQUEST
  };
};

var fetchLogoutSuccess = exports.fetchLogoutSuccess = function fetchLogoutSuccess(payload) {
  return {
    type: t.FETCH_LOGOUT_SUCCESS,
    payload: payload
  };
};

var fetchLogoutFailure = exports.fetchLogoutFailure = function fetchLogoutFailure(error) {
  return {
    type: t.FETCH_LOGOUT_FAILURE,
    error: true,
    payload: error
  };
};

exports.default = function () {
  return function (dispatch) {
    dispatch(fetchLogoutRequest());

    var auth = _config2.default.getConfig().firebase.auth();

    return auth.signOut().then(function (response) {
      dispatch(fetchLogoutSuccess(response));
      return response;
    }).catch(function (error) {
      dispatch(fetchLogoutFailure(error));
      return error;
    });
  };
};