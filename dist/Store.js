"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _events = require("events");

var _Constants = _interopRequireDefault(require("./Constants"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var Store =
/*#__PURE__*/
function (_EventEmitter) {
  _inherits(Store, _EventEmitter);

  function Store(props) {
    var _this;

    _classCallCheck(this, Store);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Store).call(this, props));
    _this.id = 0; // Autoincrement id

    _this.popup = null; // The popup id that is currently open

    _this.popups = {}; // Set of registered popups

    _this.queue = []; // Queue of popups to show in sequence.

    return _this;
  }
  /**
   * Returns the id for the next popup
   *
   * @return {int} Id for the next popup
   */


  _createClass(Store, [{
    key: "getId",
    value: function getId() {
      this.id += 1;
      return "id_".concat(this.id);
    }
    /**
     * Adds id value to the popup and register this in the objects store.
     *
     * @param  {Object} popup Settings for the popup
     *
     * @return {Object}       The settings popup including the autoincremental id
     */

  }, {
    key: "openPopup",
    value: function openPopup(popup) {
      this.popups[popup.id] = popup;

      if (this.popup) {
        var currentPopup = this.popup;
        this.popup = null;
        this.queue.push(currentPopup);
        this.queue.push(popup.id);
      } else {
        this.queue.push(popup.id);
      }

      this.nextPopup();
    }
    /**
     * Closes the current popup and loads the next popup from queue.
     *
     * @return {int} The closed popup id.
     */

  }, {
    key: "closePopup",
    value: function closePopup() {
      if (!this.popup) {
        return false;
      }

      var id = this.popup;
      this.popup = null;
      this.emit(_Constants.default.CLOSE, id);
      this.nextPopup();
      return id;
    }
    /**
     * Returns the current popup
     *
     * @return {Object} The current popup
     */

  }, {
    key: "currentPopup",
    value: function currentPopup() {
      return this.popups[this.popup];
    }
    /**
     * Actives the next popup to show from queue
     *
     * @return {boolean} True if there is a popup within queue, False otherwise
     */

  }, {
    key: "nextPopup",
    value: function nextPopup() {
      if (this.popup || this.queue.length < 1) {
        return false;
      }

      this.popup = this.queue.pop();
      this.emit(_Constants.default.OPEN, this.popup);
      return true;
    }
    /**
     * Clear the queue array
     */

  }, {
    key: "clearQueue",
    value: function clearQueue() {
      this.queue = [];
    }
  }]);

  return Store;
}(_events.EventEmitter);

exports.default = Store;