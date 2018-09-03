"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable no-unused-vars */

/* eslint-enable no-unused-vars */

/**
 * This component render a iframe with a video from YouTube or Vimeo.
 *
 * @param  {props} props Component properties
 *                       This properties must have a videoID property.
 */
var VideoIFrame = function VideoIFrame(props) {
  var styles = {
    iframeWrapper: {
      paddingBottom: '56.25%',
      position: 'relative',
      height: 0
    },
    iframe: {
      border: 'none',
      height: '100%',
      left: 0,
      position: 'absolute',
      top: 0,
      width: '100%'
    }
  };
  var src = "https://www.youtube.com/embed/".concat(props.videoId, "?autoplay=").concat(props.autoPlay ? 1 : 0, "&rel=0&showinfo=0");
  /* eslint-disable no-restricted-globals */

  if (!isNaN(props.videoID)) {
    src = "https://player.vimeo.com/video/".concat(props.videoID, "?autoplay=").concat(props.autoPlay ? 1 : 0, "&title=0&byline=0&portrait=0");
  }
  /* eslint-disable no-restricted-globals */


  return _react.default.createElement("div", {
    style: styles.iframeWrapper
  }, _react.default.createElement("iframe", {
    style: styles.iframe,
    src: src,
    allowFullScreen: "true",
    allow: "autoplay"
  }));
};

var _default = VideoIFrame;
exports.default = _default;