import { Container } from "@mui/material";
import classes from './user-page.module.css'
import UserDetail from "./UserDetail";
import { redirect } from "next/navigation";
import UserSection from "./UserSection";
import { serverSession } from "@/auth";
import { getVideosByUser } from "@/lib/videos";
import { VideoType } from "@/helper/commonTypes";

export default async function UserLayout() {
  const session = await serverSession();
  if(!session){
    redirect('/home');
  }
  const user = session.user;
  
  const videos =await getVideosByUser(user.id as string)
  
  
  return (
  <Container maxWidth='lg' className={classes.layout}>
    <UserDetail/>
    <UserSection videos={videos as VideoType[]}/>
    
  </Container>
);
}
