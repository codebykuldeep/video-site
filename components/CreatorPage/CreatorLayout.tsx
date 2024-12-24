import { Box, Container } from '@mui/material'
import UserVideo from '../UserPage/UserVideo'
import classes from '../UserPage/user-page.module.css'
import CreatorDetail from './CreatorDetail'
import { getUserById } from '@/lib/users'
import { UserType, VideoType } from '@/helper/commonTypes'
import { getVideosByUser } from '@/lib/videos'
import { notFound } from 'next/navigation'

export default async function CreatorLayout({ userId}: {userId: string}) {
  const user = await getUserById(userId) as UserType;
  if(!user){
    notFound();
  }
  
  const videos =await getVideosByUser(userId) as VideoType[];
  
  
  return (
    <Container maxWidth='lg' className={classes.layout}>
    <CreatorDetail user={user}/>
    <Box component={'ul'} className={classes.link}>
            <Box component={'li'}>Videos</Box>
        </Box>
    <UserVideo videos={videos}/>
    
  </Container>
  )
}
