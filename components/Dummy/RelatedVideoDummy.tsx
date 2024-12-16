import { Box, Skeleton } from '@mui/material'
import classes from './related-video-dummy.module.css'

export default function RelatedVideoDummy() {
  return (
    <>
    {(new Array(6).fill(0).map((_,ind)=>(
      <Box className={classes.container} key={ind}>
        <Box>
            <Skeleton width={'161px'} height={'94px'} variant='rounded' className={classes.skeleton}/>
        </Box>
        <Box className={classes.text}>
            <Skeleton width={'150px'} height={'15px'} variant='rectangular' className={classes.skeleton}/>
            <Skeleton width={'150px'} height={'15px'} variant='rectangular' className={classes.skeleton}/>
            <Skeleton width={'150px'} height={'10px'} variant='rectangular' className={classes.skeleton}/>
        </Box>
    </Box>
    )))}
    </>
  )
}
