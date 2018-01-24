"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

/**
 * 
 * @param {object} store 
 * @param {function} shouldUpdate should return bool
 * @param {function} triggerUpdate 
 * @returns {function} unsubscribeStore
 */
var subscribeStore = exports.subscribeStore = function subscribeStore(store, shouldUpdate, triggerUpdate) {
  var prevState = store.getState();
  var mounted = true;

  var unsubscribe = store.subscribe(function () {
    var nextState = store.getState();
    mounted && shouldUpdate(prevState, nextState) && triggerUpdate();
    prevState = nextState;
  });

  return function () {
    return (mounted = false) || unsubscribe();
  };
};