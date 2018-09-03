/* eslint-disable no-unused-vars */
import React from 'react';
/* eslint-enable no-unused-vars */

/**
 * This component render a iframe with a video from YouTube or Vimeo.
 *
 * @param  {props} props Component properties
 *                       This properties must have a videoID property.
 */
const VideoIFrame = (props) => {
  const styles = {
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

  let src = `https://www.youtube.com/embed/${props.videoId}?autoplay=${props.autoPlay ? 1 : 0}&rel=0&showinfo=0`;

  /* eslint-disable no-restricted-globals */
  if (!isNaN(props.videoID)) {
    src = `https://player.vimeo.com/video/${props.videoID}?autoplay=${props.autoPlay ? 1 : 0}&title=0&byline=0&portrait=0`;
  }
  /* eslint-disable no-restricted-globals */

  return (
    <div style={styles.iframeWrapper}>
      <iframe style={styles.iframe} src={src} allowFullScreen='true' allow='autoplay' />
    </div>
  );
};

export default VideoIFrame;
