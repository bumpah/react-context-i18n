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

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } _setPrototypeOf(subClass.prototype, superClass && superClass.prototype); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.getPrototypeOf || function _getPrototypeOf(o) { return o.__proto__; }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var ReactTranslate =
/*#__PURE__*/
function (_React$Component) {
  function ReactTranslate() {
    var _getPrototypeOf2;

    var _temp, _this;

    _classCallCheck(this, ReactTranslate);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _possibleConstructorReturn(_this, (_temp = _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(ReactTranslate)).call.apply(_getPrototypeOf2, [this].concat(args))), _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "state", {
      catched: false
    }), _temp));
  }

  _createClass(ReactTranslate, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      if (this.state.catched) {
        return null;
      }

      var text = this.props.text || this.props.children || '';
      var context = this.props.context || 'default';
      var vars = this.props.vars;

      if (!vars) {
        vars = this.props.variables;
      }

      var pre = this.props.p || this.props.pre || this.props.prefix || '';
      var suf = this.props.s || this.props.suf || this.props.suffix || '';

      if (this.props.plural && typeof this.props.count !== 'undefined') {
        text = this.props.plural[this.props.count];
      }

      return _react.default.createElement(_Context.default.Consumer, null, function (trans) {
        var translations = trans.translations;
        var toPrint = (translations[context] ? translations[context][text] : translations[text]) || text;

        if (Array.isArray(vars)) {
          var match = _this2.props.customPlaceholder ? _this2.props.customPlaceholder : /\${.*}/;
          vars.map(function (item) {
            toPrint = toPrint.replace(match, item);
          });
        } else if (vars) {
          Object.keys(vars).map(function (item) {
            var match = _this2.props.customPlaceholder ? _this2.props.customPlaceholder : "${".concat(item, "}");
            toPrint = toPrint.replace(match, vars[item]);
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

  _inherits(ReactTranslate, _React$Component);

  return ReactTranslate;
}(_react.default.Component);

exports.ReactTranslate = ReactTranslate;

_defineProperty(ReactTranslate, "defaultProps", {
  vars: null,
  variables: null
});

var _default = ReactTranslate;
exports.default = _default;