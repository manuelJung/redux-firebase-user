'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AbstractAuthOButton = undefined;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var createStyle = function createStyle(_ref) {
  var background = _ref.background,
      color = _ref.color,
      width = _ref.width,
      size = _ref.size,
      hideText = _ref.hideText;
  return {
    wrapper: {
      background: background,
      display: 'flex',
      borderRadius: 5 * size,
      cursor: 'pointer',
      // width: width || 'auto',
      width: hideText ? 40 * size : width || 'auto'
    },
    iconWrapper: {
      height: 34 * size,
      width: 34 * size,
      padding: 3 * size
    },
    text: {
      height: 40 * size,
      fontSize: 18 * size,
      display: 'flex',
      alignItems: 'center',
      paddingLeft: 10 * size,
      color: color,
      borderLeft: '1px solid #777',
      fontFamily: 'Roboto-Medium'
    }
  };
};

var AbstractAuthOButton = function AbstractAuthOButton(_ref2) {
  var onClick = _ref2.onClick,
      vector = _ref2.vector,
      children = _ref2.children,
      text = _ref2.text,
      props = _objectWithoutProperties(_ref2, ['onClick', 'vector', 'children', 'text']);

  var style = createStyle(props);
  return _react2.default.createElement(
    'div',
    { onClick: onClick, style: style.wrapper },
    _react2.default.createElement(
      'div',
      { style: style.iconWrapper },
      _react2.default.createElement(
        'svg',
        { viewBox: '0 0 512 512' },
        _react2.default.createElement('path', { d: vector, fill: props.color })
      )
    ),
    !props.hideText && _react2.default.createElement(
      'div',
      { style: style.text },
      children || text
    )
  );
};

exports.AbstractAuthOButton = AbstractAuthOButton;
exports.default = AbstractAuthOButton;


AbstractAuthOButton.propTypes = {
  // cb for click event
  onClick: _react.PropTypes.func.isRequired,

  // background of button => css color
  background: _react.PropTypes.string.isRequired,

  // font and icon color => css color
  color: _react.PropTypes.string.isRequired,

  // size of everything in percent
  // 0 => 0%
  // 1 => 100%
  size: _react.PropTypes.number.isRequired,

  // width of the button
  // default: auto
  width: _react.PropTypes.oneOfType([_react.PropTypes.number, _react.PropTypes.string // z.b 50%
  ]),

  // if true, no text will be displayed width will be shrinked to icon width
  hideText: _react.PropTypes.bool,

  // displayed text
  text: _react.PropTypes.string,

  // displayed text (higher priority as text)
  children: _react.PropTypes.string
};