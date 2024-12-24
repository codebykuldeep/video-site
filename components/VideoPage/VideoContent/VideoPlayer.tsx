import { Box } from '@mui/material'
import classes from './video-content.module.css'
import { VideoCreatorType } from '@/helper/commonTypes'
import VideoJSPlayer from './VideoJS';
import VideoIncreaseCount from '../VideoIncreaseCount';
interface VideoPlayerProps{
  video:VideoCreatorType;
}

export default function VideoPlayer({video}:VideoPlayerProps) {
  const videoJsOptions = {
    autoplay:true,
    sources: [
      {
        src: video.video_url,
        type: "application/x-mpegURL",
      },
      
    ]
  };
  return (
    <Box className={classes.player}>
        <VideoJSPlayer options={videoJsOptions} />
        <VideoIncreaseCount/>
    </Box>
  )
}
