'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GoogleAuthOButton = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _AbstractAuthOButton = require('./AbstractAuthOButton');

var _AbstractAuthOButton2 = _interopRequireDefault(_AbstractAuthOButton);

var _withLoginHandler = require('../hocs/withLoginHandler');

var _withLoginHandler2 = _interopRequireDefault(_withLoginHandler);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var googleVector = "M179.7 237.6L179.7 284.2 256.7 284.2C253.6 304.2 233.4 342.9 179.7 342.9 133.4 342.9 95.6 304.4 " + "95.6 257 95.6 209.6 133.4 171.1 179.7 171.1 206.1 171.1 223.7 182.4 233.8 192.1L270.6 156.6C247 " + "134.4 216.4 121 179.7 121 104.7 121 44 181.8 44 257 44 332.2 104.7 393 179.7 393 258 393 310 " + "337.8 310 260.1 310 251.2 309 244.4 307.9 237.6L179.7 237.6 179.7 237.6ZM468 236.7L429.3 236.7 " + "429.3 198 390.7 198 390.7 236.7 352 236.7 352 275.3 390.7 275.3 390.7 314 429.3 314 429.3 275.3 " + "468 275.3";

var GoogleAuthOButton = function GoogleAuthOButton(_ref) {
  var isFetching = _ref.loginHandler.isFetching,
      loginWithGoogle = _ref.loginHandlerActions.loginWithGoogle,
      background = _ref.background,
      color = _ref.color,
      size = _ref.size,
      children = _ref.children,
      rest = _objectWithoutProperties(_ref, ['loginHandler', 'loginHandlerActions', 'background', 'color', 'size', 'children']);

  return _react2.default.createElement(
    _AbstractAuthOButton2.default,
    _extends({
      onClick: function onClick() {
        return !isFetching && loginWithGoogle();
      },
      vector: googleVector,
      size: size ? parseFloat(size) : 1,
      background: '#db3236',
      color: 'whitesmoke',
      text: 'Login with Google'
    }, rest),
    children
  );
};

exports.GoogleAuthOButton = GoogleAuthOButton;
exports.default = (0, _withLoginHandler2.default)(GoogleAuthOButton);


GoogleAuthOButton.propTypes = {
  // injected by LoginHandler
  loginHandler: _react.PropTypes.shape({
    isFetching: _react.PropTypes.bool.isRequired
  }).isRequired,

  // injected by LoginHandler
  loginHandlerActions: _react.PropTypes.shape({
    loginWithGoogle: _react.PropTypes.func.isRequired
  }).isRequired,

  // background of button => css color
  // default: #db3236 (google red)
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
  // default: Login with Google
  text: _react.PropTypes.string,

  // displayed text (higher priority as text)
  children: _react.PropTypes.string
};