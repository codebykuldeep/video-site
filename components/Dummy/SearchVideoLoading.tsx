import { Box, Skeleton, Stack } from '@mui/material'
import classes from './dummy.module.css'
import React from 'react'

export default function SearchVideoLoading() {
  return (
    <>
    <Stack direction={'column'} gap={2} flexWrap={'wrap'}>
    {[1,2,3,4].map((_,ind)=>(
        <Box key={ind}  className={classes.search}>
          <Skeleton variant="rectangular" width={500} height={280} className={classes.searchimg}  />
          <Box className={classes.text}>
            <Skeleton variant="rectangular" width={288} height={15}  className={classes.skeleton} />
            <Skeleton variant="rectangular" width={288} height={8} className={classes.skeleton} />
          <Box className={classes.user}>
          <Skeleton variant="circular" width={30} height={30}  className={classes.skeleton} />
          <Skeleton variant="rectangular" width={240} height={8} className={classes.skeleton} />
          </Box>
          <Skeleton variant="rectangular" width={288} height={8} className={classes.skeleton} />
          </Box>
        </Box>
    ))}
    </Stack>
    </>
  )
}
