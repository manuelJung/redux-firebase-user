'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TwitterAuthOButton = exports.FacebookAuthOButton = exports.GoogleAuthOButton = exports.GithubAuthOButton = exports.getSignupFetchError = exports.signupFetchFailed = exports.isFetchingSignup = exports.getLogoutFetchError = exports.logoutFetchFailed = exports.isFetchingLogout = exports.getLoginFetchError = exports.loginFetchFailed = exports.isFetchingLogin = exports.isLoggedIn = exports.getUser = exports.withSignupRequest = exports.withSignupForm = exports.withLogoutRequest = exports.withLogoutButton = exports.withLoginRequest = exports.withLoginForm = exports.withAutoLogin = exports.withUser = exports.updaters = exports.actions = exports.actionTypes = exports.reducer = undefined;

var _reducer = require('./reducer');

Object.defineProperty(exports, 'reducer', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_reducer).default;
  }
});

var _withUser = require('./hocs/withUser');

Object.defineProperty(exports, 'withUser', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_withUser).default;
  }
});

var _withAutoLogin = require('./hocs/withAutoLogin');

Object.defineProperty(exports, 'withAutoLogin', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_withAutoLogin).default;
  }
});

var _withLoginForm = require('./hocs/withLoginForm');

Object.defineProperty(exports, 'withLoginForm', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_withLoginForm).default;
  }
});

var _withLoginRequest = require('./hocs/withLoginRequest');

Object.defineProperty(exports, 'withLoginRequest', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_withLoginRequest).default;
  }
});

var _withLogoutButton = require('./hocs/withLogoutButton');

Object.defineProperty(exports, 'withLogoutButton', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_withLogoutButton).default;
  }
});

var _withLogoutRequest = require('./hocs/withLogoutRequest');

Object.defineProperty(exports, 'withLogoutRequest', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_withLogoutRequest).default;
  }
});

var _withSignupForm = require('./hocs/withSignupForm');

Object.defineProperty(exports, 'withSignupForm', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_withSignupForm).default;
  }
});

var _withSignupRequest = require('./hocs/withSignupRequest');

Object.defineProperty(exports, 'withSignupRequest', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_withSignupRequest).default;
  }
});

var _selectors = require('./selectors');

Object.defineProperty(exports, 'getUser', {
  enumerable: true,
  get: function get() {
    return _selectors.getUser;
  }
});
Object.defineProperty(exports, 'isLoggedIn', {
  enumerable: true,
  get: function get() {
    return _selectors.isLoggedIn;
  }
});
Object.defineProperty(exports, 'isFetchingLogin', {
  enumerable: true,
  get: function get() {
    return _selectors.isFetchingLogin;
  }
});
Object.defineProperty(exports, 'loginFetchFailed', {
  enumerable: true,
  get: function get() {
    return _selectors.loginFetchFailed;
  }
});
Object.defineProperty(exports, 'getLoginFetchError', {
  enumerable: true,
  get: function get() {
    return _selectors.getLoginFetchError;
  }
});
Object.defineProperty(exports, 'isFetchingLogout', {
  enumerable: true,
  get: function get() {
    return _selectors.isFetchingLogout;
  }
});
Object.defineProperty(exports, 'logoutFetchFailed', {
  enumerable: true,
  get: function get() {
    return _selectors.logoutFetchFailed;
  }
});
Object.defineProperty(exports, 'getLogoutFetchError', {
  enumerable: true,
  get: function get() {
    return _selectors.getLogoutFetchError;
  }
});
Object.defineProperty(exports, 'isFetchingSignup', {
  enumerable: true,
  get: function get() {
    return _selectors.isFetchingSignup;
  }
});
Object.defineProperty(exports, 'signupFetchFailed', {
  enumerable: true,
  get: function get() {
    return _selectors.signupFetchFailed;
  }
});
Object.defineProperty(exports, 'getSignupFetchError', {
  enumerable: true,
  get: function get() {
    return _selectors.getSignupFetchError;
  }
});

var _GithubAuthOButton = require('./components/GithubAuthOButton');

Object.defineProperty(exports, 'GithubAuthOButton', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_GithubAuthOButton).default;
  }
});

var _GoogleAuthOButton = require('./components/GoogleAuthOButton');

Object.defineProperty(exports, 'GoogleAuthOButton', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_GoogleAuthOButton).default;
  }
});

var _FacebookAuthOButton = require('./components/FacebookAuthOButton');

Object.defineProperty(exports, 'FacebookAuthOButton', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_FacebookAuthOButton).default;
  }
});

var _TwitterAuthOButton = require('./components/TwitterAuthOButton');

Object.defineProperty(exports, 'TwitterAuthOButton', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_TwitterAuthOButton).default;
  }
});

var _hocs = require('./hocs');

var fromHocs = _interopRequireWildcard(_hocs);

var fromSelectors = _interopRequireWildcard(_selectors);

var _actionTypes = require('./actionTypes');

var fromActionTypes = _interopRequireWildcard(_actionTypes);

var _actions = require('./actions');

var fromActions = _interopRequireWildcard(_actions);

var _components = require('./components');

var fromComponents = _interopRequireWildcard(_components);

var _updaters = require('./updaters');

var fromUpdaters = _interopRequireWildcard(_updaters);

var _config = require('./config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// export { default as config } from './config'

// export const hocs        = fromHocs
// export const selectors   = fromSelectors
var actionTypes = exports.actionTypes = fromActionTypes;
var actions = exports.actions = fromActions;
// export const components  = fromComponents
var updaters = exports.updaters = fromUpdaters;

exports.default = {
  initializeModule: _config2.default.setConfig,
  updateModule: _config2.default.setConfig
};

// HOCs