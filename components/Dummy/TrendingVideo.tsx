import { Box, Skeleton, Stack } from '@mui/material'
import classes from './dummy.module.css'

export default function TrendingVideo() {
  return (
    <>
    <Stack direction={'row'} gap={2} flexWrap={'wrap'}>
    {[1,2,3,4].map((_,ind)=>(
        <Box key={ind}  className={classes.box}>
        <Skeleton variant="rectangular" width={288} height={185} className={classes.skeleton}  />
        <Skeleton variant="rectangular" width={288} height={15}  className={classes.skeleton} />
        <Skeleton variant="rectangular" width={288} height={8} className={classes.skeleton} />
        </Box>
    ))}
    </Stack>
    </>
  )
}
