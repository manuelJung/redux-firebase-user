'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.selectors = exports.updaters = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = reducer;

var _actionTypes = require('../actionTypes');

var t = _interopRequireWildcard(_actionTypes);

var _loginRequest = require('./loginRequest');

var fromLoginRequest = _interopRequireWildcard(_loginRequest);

var _signupRequest = require('./signupRequest');

var fromSignupRequest = _interopRequireWildcard(_signupRequest);

var _logoutRequest = require('./logoutRequest');

var fromLogoutRequest = _interopRequireWildcard(_logoutRequest);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var defaultState = {
  user: null,
  loginRequest: undefined,
  signupRequest: undefined,
  logoutRequest: undefined
};

var updaters = exports.updaters = {
  clearUser: function clearUser(state) {
    return _extends({}, state, { user: null });
  },
  setUser: function setUser(state, payload) {
    return _extends({}, state, { user: payload });
  }
};

function reducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : defaultState;
  var action = arguments[1];

  switch (action.type) {

    case t.FETCH_LOGIN_SUCCESS:
      return _extends({}, updaters.setUser(state, action.payload), {
        loginRequest: (0, fromLoginRequest.default)(state.loginRequest, action)
      });

    case t.FETCH_LOGOUT_SUCCESS:
      return _extends({}, updaters.clearUser(state), {
        logoutRequest: (0, fromLoginRequest.default)(state.loginRequest, action)
      });

    case t.FETCH_SIGNUP_SUCCESS:
      return _extends({}, updaters.setUser(state, action.payload), {
        signupRequest: (0, fromSignupRequest.default)(state.signupRequest, action)
      });

    default:
      return _extends({}, state, {
        loginRequest: (0, fromLoginRequest.default)(state.loginRequest, action),
        logoutRequest: (0, fromLogoutRequest.default)(state.logoutRequest, action),
        signupRequest: (0, fromSignupRequest.default)(state.signupRequest, action)
      });
  }
}

var mapSelectors = function mapSelectors(selectors, key) {
  return Object.keys(selectors).reduce(function (prev, next) {
    return Object.assign(prev, _defineProperty({}, next, function (state) {
      for (var _len = arguments.length, rest = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        rest[_key - 1] = arguments[_key];
      }

      return selectors[next].apply(selectors, [state[key]].concat(rest));
    }));
  }, {});
};

var selectors = exports.selectors = {
  getUser: function getUser(state) {
    return state.user;
  },
  isLoggedIn: function isLoggedIn(state) {
    return !!state.user;
  },

  loginRequest: mapSelectors(fromLoginRequest.selectors, 'loginRequest'),
  logoutRequest: mapSelectors(fromLogoutRequest.selectors, 'logoutRequest'),
  signupRequest: mapSelectors(fromSignupRequest.selectors, 'signupRequest')
};