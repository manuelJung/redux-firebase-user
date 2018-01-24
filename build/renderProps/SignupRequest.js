'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.withSignupRequest = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _config = require('../config');

var _config2 = _interopRequireDefault(_config);

var _utils = require('../utils');

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _selectors = require('../selectors');

var _actions = require('../actions');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SignupRequest = function (_React$Component) {
  _inherits(SignupRequest, _React$Component);

  function SignupRequest() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, SignupRequest);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = SignupRequest.__proto__ || Object.getPrototypeOf(SignupRequest)).call.apply(_ref, [this].concat(args))), _this), _this.unsubscribeStore = null, _this.render = function () {
      return _this.props.render(_this.getRenderProps());
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(SignupRequest, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      var store = this.context.store;
      var update = this.forceUpdate.bind(this);
      this.unsubscribeStore = (0, _utils.subscribeStore)(store, this.shouldTriggerUpdate, update);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.unsubscribeStore();
    }
  }, {
    key: 'shouldTriggerUpdate',
    value: function shouldTriggerUpdate(prevState, nextState) {
      var reducerKey = _config2.default.getConfig().reducerKey;
      return prevState[reducerKey] !== nextState[reducerKey];
    }
  }, {
    key: 'getRenderProps',
    value: function getRenderProps() {
      var state = this.context.store.getState();
      var dispatch = this.context.store.dispatch;

      return {
        isFetching: (0, _selectors.isFetchingSignup)(state),
        fetchError: (0, _selectors.getSignupFetchError)(state),

        signup: function signup(u, p) {
          return dispatch((0, _actions.signup)(u, p));
        }
      };
    }
  }]);

  return SignupRequest;
}(_react2.default.Component);

SignupRequest.contextTypes = {
  store: _propTypes2.default.object
};
SignupRequest.propTypes = {
  render: _propTypes2.default.func.isRequired
};
exports.default = SignupRequest;
var withSignupRequest = exports.withSignupRequest = function withSignupRequest(configOrFunc) {
  return function (Component) {
    return function (props) {
      var config = typeof configOrFunc === 'function' ? configOrFunc(props) : configOrFunc;
      return _react2.default.createElement(SignupRequest, _extends({}, config, { render: function render(data) {
          return _react2.default.createElement(Component, _extends({}, data, props));
        } }));
    };
  };
};