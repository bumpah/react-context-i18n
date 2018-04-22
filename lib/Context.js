"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.I18 = void 0;

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DefaultLangContext = {
  translations: {}
};

var I18 = _react.default.createContext(DefaultLangContext);

exports.I18 = I18;
var _default = I18;
exports.default = _default;