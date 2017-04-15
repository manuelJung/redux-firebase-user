'use strict';

var _tape = require('tape');

var _tape2 = _interopRequireDefault(_tape);

var _selectors = require('../selectors');

var selectors = _interopRequireWildcard(_selectors);

var _config = require('../config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_config2.default.setConfig({ firebase: "firebase " });

// User

(0, _tape2.default)('selector => getUser', function (t) {
    var state = { user: {
            user: "user"
        } };
    var selection = selectors.getUser(state);

    t.is(selection, "user", "it should return the user if exists");

    t.end();
});

(0, _tape2.default)('selector => isLoggedIn', function (t) {
    var state = { user: {
            user: "user"
        } };
    var selection = selectors.isLoggedIn(state);

    t.is(selection, true, "it should return true, if a user exists");

    state = { user: {
            user: null
        } };
    var selection = selectors.isLoggedIn(state);

    t.is(selection, false, "it should return false, if no user exists");

    t.end();
});

// Login

(0, _tape2.default)('selector => isFetchingLogin', function (t) {
    var state = { user: {
            loginRequest: { isFetching: true }
        } };
    var selection = selectors.isFetchingLogin(state);

    t.is(selection, true, "it should return true, if user is fetching login request");

    var state = { user: {
            loginRequest: { isFetching: false }
        } };
    selection = selectors.isFetchingLogin(state);

    t.is(selection, false, "it should return false, if user does not fetch login request");

    t.end();
});

(0, _tape2.default)("selector => loginFetchFailed", function (t) {
    var state = { user: {
            loginRequest: { fetchFailed: true }
        } };
    var selection = selectors.loginFetchFailed(state);

    t.is(selection, true, "it should return true, if the last login request failed");

    state = { user: {
            loginRequest: { fetchFailed: false }
        } };
    selection = selectors.loginFetchFailed(state);

    t.is(selection, false, "it should return false, if the last login request does not fail");

    t.end();
});

(0, _tape2.default)("selector => getLoginFetchError", function (t) {
    var state = { user: {
            loginRequest: { error: "error" }
        } };
    var selection = selectors.getLoginFetchError(state);

    t.is(selection, "error", "it should return the error if the last login request failed");

    t.end();
});

// Logout

(0, _tape2.default)('selector => isFetchingLogout', function (t) {
    var state = { user: {
            logoutRequest: { isFetching: true }
        } };
    var selection = selectors.isFetchingLogout(state);

    t.is(selection, true, "it should return true, if user is fetching logout request");

    var state = { user: {
            logoutRequest: { isFetching: false }
        } };
    selection = selectors.isFetchingLogout(state);

    t.is(selection, false, "it should return false, if user does not fetch logout request");

    t.end();
});

(0, _tape2.default)("selector => logoutFetchFailed", function (t) {
    var state = { user: {
            logoutRequest: { fetchFailed: true }
        } };
    var selection = selectors.logoutFetchFailed(state);

    t.is(selection, true, "it should return true, if the last logout request failed");

    state = { user: {
            logoutRequest: { fetchFailed: false }
        } };
    selection = selectors.logoutFetchFailed(state);

    t.is(selection, false, "it should return false, if the last logout request does not fail");

    t.end();
});

(0, _tape2.default)("selector => getLogoutFetchError", function (t) {
    var state = { user: {
            logoutRequest: { error: "error" }
        } };
    var selection = selectors.getLogoutFetchError(state);

    t.is(selection, "error", "it should return the error if the last logout request failed");

    t.end();
});

// Signup

(0, _tape2.default)('selector => isFetchingSignup', function (t) {
    var state = { user: {
            signupRequest: { isFetching: true }
        } };
    var selection = selectors.isFetchingSignup(state);

    t.is(selection, true, "it should return true, if user is fetching signup request");

    var state = { user: {
            signupRequest: { isFetching: false }
        } };
    selection = selectors.isFetchingSignup(state);

    t.is(selection, false, "it should return false, if user does not fetch signup request");

    t.end();
});

(0, _tape2.default)("selector => signupFetchFailed", function (t) {
    var state = { user: {
            signupRequest: { fetchFailed: true }
        } };
    var selection = selectors.signupFetchFailed(state);

    t.is(selection, true, "it should return true, if the last signup request failed");

    state = { user: {
            signupRequest: { fetchFailed: false }
        } };
    selection = selectors.signupFetchFailed(state);

    t.is(selection, false, "it should return false, if the last signup request does not fail");

    t.end();
});

(0, _tape2.default)("selector => getSignupFetchError", function (t) {
    var state = { user: {
            signupRequest: { error: "error" }
        } };
    var selection = selectors.getSignupFetchError(state);

    t.is(selection, "error", "it should return the error if the last signup request failed");

    t.end();
});