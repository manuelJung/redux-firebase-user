'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FacebookAuthOButton = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _AbstractAuthOButton = require('./AbstractAuthOButton');

var _AbstractAuthOButton2 = _interopRequireDefault(_AbstractAuthOButton);

var _withLoginHandler = require('../hocs/withLoginHandler');

var _withLoginHandler2 = _interopRequireDefault(_withLoginHandler);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var facebookVector = "M211.9 197.4h-36.7v59.9h36.7V433.1h70.5V256.5h49.2l5.2-59.1h-54.4c0 0 0-22.1 0-33.7 0-13.9 2.8-19" + ".5 16.3-19.5 10.9 0 38.2 0 38.2 0V82.9c0 0-40.2 0-48.8 0 -52.5 0-76.1 23.1-76.1 67.3C211.9 188.8 " + "211.9 197.4 211.9 197.4z";

var FacebookAuthOButton = function FacebookAuthOButton(_ref) {
  var isFetching = _ref.loginHandler.isFetching,
      background = _ref.background,
      color = _ref.color,
      size = _ref.size,
      children = _ref.children,
      rest = _objectWithoutProperties(_ref, ['loginHandler', 'background', 'color', 'size', 'children']);

  return _react2.default.createElement(
    _AbstractAuthOButton2.default,
    _extends({
      onClick: function onClick() {
        return !isFetching && console.log("LOGIN WITH FACEBOOK NOT IMPLEMENTED YET");
      },
      vector: facebookVector,
      size: size ? parseFloat(size) : 1,
      background: '#29487D',
      color: 'whitesmoke',
      text: 'Login with Facebook'
    }, rest),
    children
  );
};

exports.FacebookAuthOButton = FacebookAuthOButton;
exports.default = (0, _withLoginHandler2.default)(FacebookAuthOButton);


FacebookAuthOButton.propTypes = {
  // injected by LoginHandler
  loginHandler: _react.PropTypes.shape({
    isFetching: _react.PropTypes.bool.isRequired
  }).isRequired,

  // injected by LoginHandler
  // loginHandlerActions: PropTypes.shape({
  //   loginWithGoogle: PropTypes.func.isRequired
  // }).isRequired,

  // background of button => css color
  // default: #29487D (facebook blue)
  background: _react.PropTypes.string,

  // font and icon color => css color
  // default: whitesmoke
  color: _react.PropTypes.string,

  // size of everything in percent (float or floatable string)
  // 0 => 0%
  // 1 => 100% (default)
  size: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.number]),

  // width of the button
  // default: auto
  width: _react.PropTypes.oneOfType([_react.PropTypes.number, _react.PropTypes.string // z.b 50%
  ]),

  // if true, no text will be displayed width will be shrinked to icon width
  hideText: _react.PropTypes.bool,

  // displayed text
  // default: Login with Facebook
  text: _react.PropTypes.string,

  // displayed text (higher priority as text)
  children: _react.PropTypes.string
};