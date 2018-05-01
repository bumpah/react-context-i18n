"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var getFile = function getFile(filename) {
  return require('./' + filename);
}; // const compileJson = (array: Props): object => {


function compileJson(array) {
  var keepTrack = {
    defaulted: false
  };
  var json = array.reduce(function (acc, cur) {
    if (!cur.context && keepTrack.defaulted) {
      return acc;
    }

    if (!cur.context && cur.file) {
      keepTrack.defaulted = true;
      var def = getFile(cur.file);
      return _objectSpread({}, acc, {
        default: def
      });
    }

    if (cur.json) {
      return cur.context ? _objectSpread({}, acc, _defineProperty({}, cur.context, cur.json)) : _objectSpread({}, acc, {
        default: cur.json
      });
    }

    return _objectSpread({}, acc, _defineProperty({}, cur.context, _objectSpread({}, getFile(cur.file))));
  }, {});
  return json;
}

var _default = compileJson;
exports.default = _default;