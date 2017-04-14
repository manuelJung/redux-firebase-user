'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = function () {

  // Instance stores a reference to the Singleton
  var instance;

  var defaultOptions = {
    reducerKey: 'user',
    firebasePath: 'user',
    firebase: undefined // REQUIRED
  };

  return {

    // Create the Singleton instance if no instance exists
    // or update the existing Singleton
    setConfig: function setConfig(options) {

      if (!instance) {
        instance = _extends({}, defaultOptions, options);
      } else {
        instance = _extends({}, instance, options);
      }

      if (!instance.firebase) {
        console.warn("NO FIREBASE REF PASSED TO USER MODULE");
      }

      return instance;
    },

    // return the Singleton
    getConfig: function getConfig() {

      if (!instance) {
        console.warn("NO USER MODULE INSTANCE CREATED YET");
      }

      return instance;
    }

  };
}();