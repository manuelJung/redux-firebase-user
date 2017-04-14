'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _selectors = require('../selectors');

var _actions = require('../actions');

var _config = require('../config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

exports.default = function (BaseComponent) {
  var _class, _temp2;

  return _temp2 = _class = function (_React$Component) {
    _inherits(WithLoginForm, _React$Component);

    function WithLoginForm() {
      var _ref;

      var _temp, _this, _ret;

      _classCallCheck(this, WithLoginForm);

      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = WithLoginForm.__proto__ || Object.getPrototypeOf(WithLoginForm)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
        username: '',
        password: ''
      }, _this.unsubscribeStore = null, _this.hasMounted = false, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(WithLoginForm, [{
      key: 'componentWillMount',
      value: function componentWillMount() {
        var _this2 = this;

        var store = this.context.store;
        var state = store.getState();
        this.hasMounted = true;

        this.unsubscribeStore = store.subscribe(function () {
          var nextState = store.getState();
          var shouldForceUpdate = state && _this2.shouldForceUpdate(state, nextState);
          state = nextState;
          if (shouldForceUpdate && _this2.hasMounted) {
            _this2.forceUpdate();
          }
        });
      }
    }, {
      key: 'componentWillUnmount',
      value: function componentWillUnmount() {
        this.unsubscribeStore();
        this.hasMounted = false;
      }
    }, {
      key: 'shouldForceUpdate',
      value: function shouldForceUpdate(prevState, nextState) {
        var reducerKey = _config2.default.getConfig().reducerKey;
        return prevState[reducerKey] !== nextState[reducerKey];
      }
    }, {
      key: 'getInjection',
      value: function getInjection() {
        var _this3 = this;

        var state = this.context.store.getState();
        var dispatch = this.context.store.dispatch;

        var login = function login() {
          return dispatch((0, _actions.login)(_this3.state.username, _this3.state.password));
        };
        var clearForm = function clearForm() {
          return _this3.setState({ username: '', password: '' });
        };
        var clearPassword = function clearPassword() {
          return _this3.setState({ password: '' });
        };

        return {

          loginForm: {
            isFetching: (0, _selectors.isFetchingLogin)(state),
            fetchFailed: (0, _selectors.loginFetchFailed)(state),
            fetchError: (0, _selectors.getLoginFetchError)(state)
          },

          loginFormActions: { clearForm: clearForm, clearPassword: clearPassword, login: login },

          loginFormComponents: {
            emailInput: {
              value: this.state.username,
              onChange: function onChange(e) {
                return _this3.setState({ username: e.target.value });
              },
              placeholder: 'E-Mail',
              type: 'text'
            },
            passwordInput: {
              value: this.state.password,
              onChange: function onChange(e) {
                return _this3.setState({ password: e.target.value });
              },
              placeholder: 'Passwort',
              type: 'password'
            },
            submitInput: {
              onClick: function onClick(e) {
                e.preventDefault();
                login();
              },
              type: 'submit',
              value: 'Submit'
            },
            submitButton: {
              onClick: login
            }
          }
        };
      }
    }, {
      key: 'render',
      value: function render() {
        var injection = this.getInjection();
        return _react2.default.createElement(BaseComponent, _extends({}, injection, this.props));
      }
    }]);

    return WithLoginForm;
  }(_react2.default.Component), _class.contextTypes = {
    store: _react2.default.PropTypes.object
  }, _temp2;
};