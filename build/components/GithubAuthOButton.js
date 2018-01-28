'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GoogleAuthOButton = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _AbstractAuthOButton = require('./AbstractAuthOButton');

var _AbstractAuthOButton2 = _interopRequireDefault(_AbstractAuthOButton);

var _withLoginRequest = require('../hocs/withLoginRequest');

var _withLoginRequest2 = _interopRequireDefault(_withLoginRequest);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var githubVector = "M256 70.7c-102.6 0-185.9 83.2-185.9 185.9 0 82.1 53.3 151.8 127.1 176.4 9.3 1.7 12.3-4 12.3-8.9V389" + ".4c-51.7 11.3-62.5-21.9-62.5-21.9 -8.4-21.5-20.6-27.2-20.6-27.2 -16.9-11.5 1.3-11.3 1.3-11.3 18.7 1" + ".3 28.5 19.2 28.5 19.2 16.6 28.4 43.5 20.2 54.1 15.4 1.7-12 6.5-20.2 11.8-24.9 -41.3-4.7-84.7-20.6-" + "84.7-91.9 0-20.3 7.3-36.9 19.2-49.9 -1.9-4.7-8.3-23.6 1.8-49.2 0 0 15.6-5 51.1 19.1 14.8-4.1 30.7-6" + ".2 46.5-6.3 15.8 0.1 31.7 2.1 46.6 6.3 35.5-24 51.1-19.1 51.1-19.1 10.1 25.6 3.8 44.5 1.8 49.2 11.9" + " 13 19.1 29.6 19.1 49.9 0 71.4-43.5 87.1-84.9 91.7 6.7 5.8 12.8 17.1 12.8 34.4 0 24.9 0 44.9 0 51 0" + " 4.9 3 10.7 12.4 8.9 73.8-24.6 127-94.3 127-176.4C441.9 153.9 358.6 70.7 256 70.7z";

var GoogleAuthOButton = function GoogleAuthOButton(_ref) {
  var isFetching = _ref.isFetching,
      loginWithGithub = _ref.loginWithGithub,
      background = _ref.background,
      color = _ref.color,
      size = _ref.size,
      children = _ref.children,
      rest = _objectWithoutProperties(_ref, ['isFetching', 'loginWithGithub', 'background', 'color', 'size', 'children']);

  return _react2.default.createElement(
    _AbstractAuthOButton2.default,
    _extends({
      onClick: function onClick() {
        return !isFetching && loginWithGithub();
      },
      vector: githubVector,
      size: size ? parseFloat(size) : 1,
      background: '#24292E',
      color: 'whitesmoke',
      text: 'Login with Github'
    }, rest),
    children
  );
};

exports.GoogleAuthOButton = GoogleAuthOButton;
exports.default = (0, _withLoginRequest2.default)()(GoogleAuthOButton);


GoogleAuthOButton.propTypes = {
  // injected by LoginRequest
  isFetching: _propTypes2.default.bool.isRequired,
  loginWithGithub: _propTypes2.default.func.isRequired,

  // background of button => css color
  // default: #24292E (github black)
  background: _propTypes2.default.string,

  // font and icon color => css color
  // default: whitesmoke
  color: _propTypes2.default.string,

  // size of everything in percent (float or floatable string)
  // 0 => 0%
  // 1 => 100% (default)
  size: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number]),

  // width of the button
  // default: auto
  width: _propTypes2.default.oneOfType([_propTypes2.default.number, _propTypes2.default.string // z.b 50%
  ]),

  // if true, no text will be displayed width will be shrinked to icon width
  hideText: _propTypes2.default.bool,

  // displayed text
  // default: Login with Github
  text: _propTypes2.default.string,

  // displayed text (higher priority as text)
  children: _propTypes2.default.string
};