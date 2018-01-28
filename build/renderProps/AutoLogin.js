'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.withAutoLogin = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _login = require('../actions/login');

var _config = require('../config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AutoLogin = function (_React$Component) {
  _inherits(AutoLogin, _React$Component);

  function AutoLogin() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, AutoLogin);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = AutoLogin.__proto__ || Object.getPrototypeOf(AutoLogin)).call.apply(_ref, [this].concat(args))), _this), _this.hasMounted = false, _this.state = {
      awaitingResponse: AutoLogin.awaitingResponse
    }, _this.render = function () {
      return _this.props.render ? _this.props.render(_extends({}, _this.state)) : null;
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  // will be set to false after the request resolves


  // will be set to false, after the first instance fires the request
  // so only one request will ever be performed altought multiply instances exist


  // true if the instance is currently mounted


  _createClass(AutoLogin, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      var _this2 = this;

      var dispatch = this.context.store.dispatch;
      this.hasMounted = true;

      // start request if this is the first instance
      if (AutoLogin.shouldRequest) {
        AutoLogin.shouldRequest = false;
        var unsubscribe = _config2.default.getConfig().firebase.auth().onAuthStateChanged(function (user) {
          if (!user) {
            unsubscribe();
            _this2.finnishAutoLogin();
          } else {
            dispatch((0, _login.fetchLoginSuccess)(user, "AUTO_LOGIN"));
            unsubscribe();
            _this2.finnishAutoLogin();
          }
        });
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.hasMounted = false;
    }
  }, {
    key: 'finnishAutoLogin',
    value: function finnishAutoLogin() {
      AutoLogin.awaitingResponse = false;

      // only call setState on a mounted component
      if (this.hasMounted) {
        this.setState({ awaitingResponse: false });
      }
    }
  }]);

  return AutoLogin;
}(_react2.default.Component);

AutoLogin.contextTypes = {
  store: _propTypes2.default.object
};
AutoLogin.propTypes = {
  render: _propTypes2.default.func };
AutoLogin.awaitingResponse = true;
AutoLogin.shouldRequest = true;
exports.default = AutoLogin;
var withAutoLogin = exports.withAutoLogin = function withAutoLogin(configOrFunc) {
  return function (Component) {
    return function (props) {
      var config = typeof configOrFunc === 'function' ? configOrFunc(props) : configOrFunc;
      return _react2.default.createElement(AutoLogin, _extends({}, config, { render: function render(data) {
          return _react2.default.createElement(Component, _extends({}, data, props));
        } }));
    };
  };
};