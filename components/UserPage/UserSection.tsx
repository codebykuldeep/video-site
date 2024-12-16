'use client';

import Link from "next/link";
import UserVideo from "./UserVideo";
import { Box } from "@mui/material";
import classes from './user-page.module.css'
import { useSearchParams } from "next/navigation";
import UploadVideo from "./UploadVideo";
import { VideoType } from "@/helper/commonTypes";
import UserProfile from "./UserProfile";

interface UserSectionProps{
  videos:VideoType[];
}
export default function UserSection({videos}:UserSectionProps) {
    const view =useSearchParams().get('view')
  return (
    <>
    <Box component={'ul'} className={classes.link}>
            <Box component={'li'}><Link href={'/user?view=videos'}>Videos</Link></Box>
            <Box component={'li'}><Link href={'/user?view=upload'}>Upload</Link></Box>
            <Box component={'li'}><Link href={'/user?view=profile'}>Profile</Link></Box>
        </Box>
    {(!view || view ==='videos')? <UserVideo videos={videos}/> : <></>}
    {view === 'upload' ? <UploadVideo/>:<></>}
    {view === 'profile' ? <UserProfile/>:<></>}
    </>
  )
}
