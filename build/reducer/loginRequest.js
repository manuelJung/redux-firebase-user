'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.selectors = exports.defaultState = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = reducer;

var _actionTypes = require('../actionTypes');

var t = _interopRequireWildcard(_actionTypes);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var defaultState = exports.defaultState = {
  error: null,
  isFetching: false,
  fetchFailed: false
};

// const updaters = {
//   waitForResponse: (state) => ({ ...state, isFetching: true, fetchFailed: false, error: null }),
//   setResponseError: (state, error) => ({ ...state, isFetching: false, fetchFailed: true, error}),
//   setResponseSuccess: (state) => ({ ...state, isFetching: false })
// }

function reducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : defaultState;
  var action = arguments[1];

  switch (action.type) {
    case t.FETCH_LOGIN_REQUEST:
      return _extends({}, state, { isFetching: true, fetchFailed: false, error: null });
    case t.FETCH_LOGIN_FAILURE:
      return _extends({}, state, { isFetching: false, fetchFailed: true, error: action.payload });
    case t.FETCH_LOGIN_SUCCESS:
      return _extends({}, state, { isFetching: false });

    // case t.FETCH_LOGIN_REQUEST: return updaters.waitForResponse(state)

    default:
      return state;
  }
}

var selectors = exports.selectors = {
  isFetching: function isFetching(state) {
    return state.isFetching;
  },
  fetchFailed: function fetchFailed(state) {
    return state.fetchFailed;
  },
  getError: function getError(state) {
    return state.error;
  }
};