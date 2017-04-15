'use strict';

var _tape = require('tape');

var _tape2 = _interopRequireDefault(_tape);

var _login2 = require('../login');

var _login3 = _interopRequireDefault(_login2);

var _sinon = require('sinon');

var _sinon2 = _interopRequireDefault(_sinon);

var _config = require('../../config');

var _config2 = _interopRequireDefault(_config);

var _actionTypes = require('../../actionTypes');

var types = _interopRequireWildcard(_actionTypes);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var loginMock = function loginMock(email, password, resolveOrReject, response) {
    var dispatchSpy = _sinon2.default.spy();
    var requestSpy = _sinon2.default.stub();

    if (resolveOrReject == 'resolve') {
        _config2.default.setConfig({
            firebase: { auth: function auth() {
                    return {
                        signInWithEmailAndPassword: requestSpy.resolves(response)
                    };
                } }
        });
    } else {
        _config2.default.setConfig({
            firebase: { auth: function auth() {
                    return {
                        signInWithEmailAndPassword: requestSpy.rejects(response)
                    };
                } }
        });
    }

    return {
        dispatchSpy: dispatchSpy,
        requestSpy: requestSpy,
        login: function login() {
            return (0, _login3.default)(email, password)(dispatchSpy);
        }
    };
};

(0, _tape2.default)('thunk => login (success)', function (t) {
    var _loginMock = loginMock("email", "password", "resolve", "user"),
        dispatchSpy = _loginMock.dispatchSpy,
        requestSpy = _loginMock.requestSpy,
        login = _loginMock.login;

    login().then(function (result) {

        t.assert(requestSpy.calledWith("email", "password"), "firebase login (emailAndPassword) should have been called");

        t.assert(dispatchSpy.calledTwice, "two actions should have been dispatched");

        t.is(dispatchSpy.firstCall.args[0].type, types.FETCH_LOGIN_REQUEST, "FETCH_LOGIN_REQUEST should have been dispatched first");

        t.is(dispatchSpy.secondCall.args[0].type, types.FETCH_LOGIN_SUCCESS, "FETCH_LOGIN_SUCCESS should have been dispatched second");

        t.is(dispatchSpy.firstCall.args[0].meta.method, 'EMAIL_AND_PASSWORD', "the method 'EMAIL_AND_PASSWORD' should have been injected to the first dispatched action as meta");

        t.is(dispatchSpy.secondCall.args[0].meta.method, 'EMAIL_AND_PASSWORD', "the method 'EMAIL_AND_PASSWORD' should have been injected to the second dispatched action as meta");

        t.end();
    });
});

(0, _tape2.default)('thunk => login (failure)', function (t) {
    var _loginMock2 = loginMock("email", "password", "reject", "error"),
        dispatchSpy = _loginMock2.dispatchSpy,
        requestSpy = _loginMock2.requestSpy,
        login = _loginMock2.login;

    login().then(function (result) {

        t.assert(requestSpy.calledWith("email", "password"), "firebase login (emailAndPassword) should have been called");

        t.assert(dispatchSpy.calledTwice, "two actions should have been dispatched");

        t.is(dispatchSpy.firstCall.args[0].type, types.FETCH_LOGIN_REQUEST, "FETCH_LOGIN_REQUEST should have been dispatched first");

        t.is(dispatchSpy.secondCall.args[0].type, types.FETCH_LOGIN_FAILURE, "FETCH_LOGIN_FAILURE should have been dispatched second");

        t.is(dispatchSpy.firstCall.args[0].meta.method, 'EMAIL_AND_PASSWORD', "the method 'EMAIL_AND_PASSWORD' should have been injected to the first dispatched action as meta");

        t.is(dispatchSpy.secondCall.args[0].meta.method, 'EMAIL_AND_PASSWORD', "the method 'EMAIL_AND_PASSWORD' should have been injected to the second dispatched action as meta");

        t.end();
    });
});