'use strict';

var _tape = require('tape');

var _tape2 = _interopRequireDefault(_tape);

var _index = require('../index.js');

var _index2 = _interopRequireDefault(_index);

var _login = require('../../actions/login');

var _logout = require('../../actions/logout');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _tape2.default)('reducer => root => FETCH_LOGIN_SUCCESS', function (t) {
    var state = { user: null };
    var action = (0, _login.fetchLoginSuccess)("new User", "method");
    var newState = (0, _index2.default)(state, action);

    t.is(newState.user, "new User", "the user should be set to the action payload");

    t.end();
});

(0, _tape2.default)('reducer => root => FETCH_LOGOUT_SUCCESS', function (t) {
    var state = { user: "user" };
    var action = (0, _logout.fetchLogoutSuccess)();
    var newState = (0, _index2.default)(state, action);

    t.is(newState.user, null, "the user should be set to null");

    t.end();
});