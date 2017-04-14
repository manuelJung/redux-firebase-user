'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setUser = exports.clearUser = undefined;

var _reducer = require('./reducer');

var clearUser = exports.clearUser = _reducer.updaters.clearUser;
var setUser = exports.setUser = _reducer.updaters.setUser;