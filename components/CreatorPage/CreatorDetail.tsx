import { Box } from '@mui/material';
import classes from '../UserPage/user-detail.module.css';
import Image from 'next/image';
import { UserType } from '@/helper/commonTypes';

export default function CreatorDetail({user}:{user:UserType}) {
  return (
    <Box className={classes.detail}>
        <Box className={classes.image}>
            <Image src={user?.image || '/image/user.png'} alt="user profile" width={160} height={160}/>
        </Box>
        <Box className={classes.text}>
            <Box component={'h1'}>{user?.name || 'Creator Name' }</Box>
            <Box component={'p'}>{user?.email || 'creater@email.com' }</Box>
        </Box>
    </Box>
  )
}
