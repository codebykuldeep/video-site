
import { Box } from "@mui/material";
import Image from "next/image";
import classes from './user-detail.module.css'
import { serverSession } from "@/auth";
import { UserType } from "@/helper/commonTypes";
import { getUserById } from "@/lib/users";


export default async  function UserDetail() {
  const data  =await serverSession();
  const user =data?.user;
  const {id} =user as {id:string};
  const userData =await getUserById(id) as UserType;
  
  
  return (
    <Box className={classes.detail}>
        <Box className={classes.image}>
            <Image src={userData?.image ||'/image/user.png'} alt="user profile" width={160} height={160} priority/>
        </Box>
        <Box className={classes.text}>
            <Box component={'h1'}>{userData?.name || 'Creator Name' }</Box>
            <Box component={'p'}>{userData?.email || 'creater@email.com' }</Box>
        </Box>
    </Box>
  )
}
