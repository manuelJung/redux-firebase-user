'use strict';

var _tape = require('tape');

var _tape2 = _interopRequireDefault(_tape);

var _loginRequest = require('../loginRequest');

var _loginRequest2 = _interopRequireDefault(_loginRequest);

var _login = require('../../actions/login');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _tape2.default)('reducer => loginRequest => FETCH_LOGIN_REQUEST', function (t) {
    var state = {
        error: "some error",
        isFetching: false,
        fetchFailed: true
    };
    var action = (0, _login.fetchLoginRequest)("method");
    var newState = (0, _loginRequest2.default)(state, action);

    t.is(newState.isFetching, true, "isFetching flag should be set to true");

    t.is(newState.fetchFailed, false, "fetchFailed flag should be reset to false");

    t.is(newState.error, null, "previous error should be cleared");

    t.end();
});

(0, _tape2.default)('reducer => loginRequest => FETCH_LOGIN_FAILURE', function (t) {
    var state = {
        isFetching: true,
        fetchFailed: false,
        error: null
    };
    var action = (0, _login.fetchLoginFailure)("error", "method");
    var newState = (0, _loginRequest2.default)(state, action);

    t.is(newState.isFetching, false, "isFetching flag should be set to false");

    t.is(newState.fetchFailed, true, "fetchFailed flag should be set to true");

    t.is(newState.error, "error", "the request error should be set to the action payload");

    t.end();
});

(0, _tape2.default)('reducer => loginRequest => FETCH_LOGIN_SUCCESS', function (t) {
    var state = {
        isFetching: true,
        fetchFailed: false,
        error: null
    };
    var action = (0, _login.fetchLoginSuccess)("payload", "method");
    var newState = (0, _loginRequest2.default)(state, action);

    t.is(newState.isFetching, false, "isFetching flag should be set to false");

    t.end();
});