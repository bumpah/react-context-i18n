"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "makeDictionary", {
  enumerable: true,
  get: function get() {
    return _Compile.default;
  }
});
Object.defineProperty(exports, "ConsumeLanguage", {
  enumerable: true,
  get: function get() {
    return _Consumer.default;
  }
});
Object.defineProperty(exports, "withLanguageContext", {
  enumerable: true,
  get: function get() {
    return _Provider.default;
  }
});

var _Compile = _interopRequireDefault(require("./Compile"));

var _Consumer = _interopRequireDefault(require("./Consumer"));

var _Provider = _interopRequireDefault(require("./Provider"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }