"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.ReactTranslate = void 0;

var _react = _interopRequireDefault(require("react"));

var _Context = _interopRequireDefault(require("./Context"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

var ReactTranslate =
/*#__PURE__*/
function (_React$Component) {
  _inherits(ReactTranslate, _React$Component);

  function ReactTranslate() {
    var _ref;

    var _temp, _this;

    _classCallCheck(this, ReactTranslate);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _possibleConstructorReturn(_this, (_temp = _this = _possibleConstructorReturn(this, (_ref = ReactTranslate.__proto__ || Object.getPrototypeOf(ReactTranslate)).call.apply(_ref, [this].concat(args))), Object.defineProperty(_assertThisInitialized(_this), "state", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: {
        catched: false
      }
    }), _temp));
  }

  _createClass(ReactTranslate, [{
    key: "render",
    value: function render() {
      if (this.state.catched) {
        return null;
      }

      var text = this.props.text || this.props.children;
      var context = this.props.context || 'default';
      var vars = this.props.vars;
      var pre = this.props.p || this.props.pre || '';
      var suf = this.props.s || this.props.suf || '';

      if (this.props.plural) {
        text = this.props.plural[this.props.count];
      }

      return _react.default.createElement(_Context.default.Consumer, null, function (trans) {
        var translations = trans.translations;
        var toPrint = translations[context] ? translations[context][text] : translations[text];

        if (Array.isArray(vars)) {
          vars.map(function (item) {
            toPrint = toPrint.replace(/\${.*}/, item);
          });
        } else if (vars) {
          Object.keys(vars).map(function (item) {
            toPrint = toPrint.replace("${".concat(item, "}"), vars[item]);
          });
        }

        return "".concat(pre).concat(toPrint || text).concat(suf);
      });
    }
  }, {
    key: "componentDidCatch",
    value: function componentDidCatch() {
      this.setState({
        catched: true
      });
    }
  }]);

  return ReactTranslate;
}(_react.default.Component);

exports.ReactTranslate = ReactTranslate;
Object.defineProperty(ReactTranslate, "defaultProps", {
  configurable: true,
  enumerable: true,
  writable: true,
  value: {
    vars: null,
    variables: null
  }
});
var _default = ReactTranslate;
exports.default = _default;