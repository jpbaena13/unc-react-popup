"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _Store = _interopRequireDefault(require("./Store"));

var _Constants = _interopRequireDefault(require("./Constants"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// Init settings for a popup
var initPopup = {
  id: null,
  title: null,
  content: null,
  data: null,
  btnAccept: false,
  btnCancel: false,
  width: 'auto',
  height: 'auto',
  minWidth: '400px',
  maxWidth: '95%',
  classes: null,
  className: null,
  onClickAccept: function onClickAccept() {
    return true;
  },
  onClickCancel: function onClickCancel() {
    return true;
  },
  onOpenPopup: function onOpenPopup() {},
  onClosePopup: function onClosePopup() {}
}; // Store pattern for popups

var store = new _Store.default();

var Popup =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Popup, _React$Component);

  function Popup(props) {
    var _this;

    _classCallCheck(this, Popup);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Popup).call(this, props));
    _this.state = {
      popup: null
    };
    _this.onOpen = _this.onOpen.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.onClose = _this.onClose.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    return _this;
  }
  /**
   * Lifecycle method
   */


  _createClass(Popup, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      store.on(_Constants.default.OPEN, this.onOpen);
      store.on(_Constants.default.CLOSE, this.onClose);
    }
    /**
     * Lifecycle method
     */

  }, {
    key: "componentWillUpdate",
    value: function componentWillUpdate() {
      if (this.state.popup) {
        this.state.popup.onClosePopup();
      }
    }
    /**
     * Lifecycle method
     */

  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate() {
      if (this.state.popup) {
        this.state.popup.onOpenPopup();
      }
    }
    /**
     * Initializes a popup from content param and call to Store.
     *
     * @param  {Object/String} content Setting for popup
     */

  }, {
    key: "onOpen",

    /**
     * Sets up the popup param as popup to render.
     *
     * @param  {Object} popup Popup setting to render.
     */
    value: function onOpen() {
      var currentPopup = store.currentPopup();
      this.setState({
        popup: currentPopup
      });
    }
    /**
     * Sets up the popup prop of the state to null
     */

  }, {
    key: "onClose",
    value: function onClose() {
      this.setState({
        popup: null
      });
    }
    /**
     * Render function
     */

  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var popupWrapper = null;
      var display = 'none';
      var className = this.state.popup && this.state.popup.className || this.props.className;

      if (this.state.popup) {
        popupWrapper = _react.default.createElement("div", {
          className: "".concat(className, "-wrapper"),
          key: this.state.popup.id,
          onClick: function onClick(e) {
            return e.stopPropagation();
          },
          style: {
            minWidth: this.state.popup.minWidth,
            maxWidth: this.state.popup.maxWidth
          }
        }, this.state.popup.title && _react.default.createElement("div", {
          className: "".concat(className, "-header")
        }, this.state.popup.title), _react.default.createElement("div", {
          className: "".concat(className, "-content")
        }, this.state.popup.content), (this.state.popup.btnAccept || this.state.popup.btnCancel) && _react.default.createElement("div", {
          className: "".concat(className, "-footer")
        }, this.state.popup.btnAccept && _react.default.createElement("button", {
          className: "".concat(className, "-btn-accept"),
          onClick: function onClick(e) {
            return _this2.state.popup.onClickAccept(e, _this2);
          }
        }, this.props.txtAccept), this.state.popup.btnCancel && _react.default.createElement("button", {
          className: "".concat(className, "-btn-cancel"),
          onClick: this.state.popup.onClickCancel
        }, this.props.txtCancel)));
        display = 'flex';
      }

      return _react.default.createElement("div", {
        className: "".concat(className, "-container"),
        style: {
          display: display
        },
        onClick: Popup.close
      }, _react.default.createElement("button", {
        onClick: function onClick(e) {
          e.stopPropagation();
          Popup.close();
        },
        className: "".concat(className, "-btn-close")
      }), popupWrapper);
    }
  }], [{
    key: "open",
    value: function open(settings) {
      var popup = null;

      if (typeof settings === 'string') {
        popup = _objectSpread({}, initPopup, {
          settings: settings
        });
      } else {
        popup = _objectSpread({}, initPopup, settings);
      }

      popup.id = store.getId();
      store.openPopup(popup);
    }
    /**
     * Closes the actived popup
     */

  }, {
    key: "close",
    value: function close() {
      store.closePopup();
    }
  }]);

  return Popup;
}(_react.default.Component);

_defineProperty(Popup, "defaultProps", {
  className: 'unc-popup',
  txtAccept: 'Accept',
  txtCancel: 'Cancel'
});

var _default = Popup;
exports.default = _default;