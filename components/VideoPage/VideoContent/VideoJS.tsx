'use client'

import videojs from "video.js";
import Player from 'video.js/dist/types/player';
// Styles
import "video.js/dist/video-js.css";
import '@videojs/themes/dist/forest/index.css';
import { useEffect, useRef } from "react";
type VideoJsPlayerOptions = Parameters<typeof videojs>[1]
interface IVideoPlayerProps {
  options: VideoJsPlayerOptions;
}


const initialOptions: VideoJsPlayerOptions = {
  controls: true,
  fluid: true,
  controlBar: {
    volumePanel: {
      inline: false
    }
  }
};

const VideoJSPlayer: React.FC<IVideoPlayerProps> = ({ options }) => {
  const videoNode = useRef<HTMLVideoElement>(null);
  const player  = useRef<Player| null>(null);

  useEffect(() => {
    player.current = videojs(videoNode.current as Element, {
      ...initialOptions,
      ...options
    }).ready(function() {
      // console.log('onPlayerReady', this);
    })!;
    return () => {
      if (player.current) {
        player.current.dispose();
      }
    };
  }, [options]);

  return <video ref={videoNode} className="video-js" />;
};

export default VideoJSPlayer;
