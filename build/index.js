'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updaters = exports.components = exports.actions = exports.actionTypes = exports.selectors = exports.hocs = exports.reducer = undefined;

var _reducer = require('./reducer');

Object.defineProperty(exports, 'reducer', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_reducer).default;
  }
});

var _hocs = require('./hocs');

var fromHocs = _interopRequireWildcard(_hocs);

var _selectors = require('./selectors');

var fromSelectors = _interopRequireWildcard(_selectors);

var _actionTypes = require('./actionTypes');

var fromActionTypes = _interopRequireWildcard(_actionTypes);

var _actions = require('./actions');

var fromActions = _interopRequireWildcard(_actions);

var _components = require('./components');

var fromComponents = _interopRequireWildcard(_components);

var _updaters = require('./updaters');

var fromUpdaters = _interopRequireWildcard(_updaters);

var _config = require('./config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// export { default as config } from './config'

var hocs = exports.hocs = fromHocs;
var selectors = exports.selectors = fromSelectors;
var actionTypes = exports.actionTypes = fromActionTypes;
var actions = exports.actions = fromActions;
var components = exports.components = fromComponents;
var updaters = exports.updaters = fromUpdaters;

exports.default = {
  initializeModule: _config2.default.setConfig,
  updateModule: _config2.default.setConfig
};