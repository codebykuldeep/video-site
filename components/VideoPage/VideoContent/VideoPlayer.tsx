import { Box } from '@mui/material'
import classes from './video-content.module.css'
import { VideoCreatorType } from '@/helper/commonTypes'
import VideoJSPlayer from './VideoJS';
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
        {/* <video  controls>
        <source src="https://res.cloudinary.com/dhnzclvra/video/upload/sp_auto/v1734184139/video_site/q6ao15l9etnhzvskds0l.m3u8" type="video/mp4" />
        Your browser does not support the video tag.
        </video> */}
        <VideoJSPlayer options={videoJsOptions} />
    </Box>
  )
}
