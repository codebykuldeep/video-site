import { Box } from "@mui/material";
import Grid from "@mui/material/Grid2";
import Image from "next/image";
import classes from "./trending-section.module.css";
import { VideoCreatorType } from "@/helper/commonTypes";
import { formatDate } from "@/helper/helperFns";
import Link from "next/link";
interface VideoListProps{
    videos:VideoCreatorType[];
}

export default function VideoList({videos}:VideoListProps) {
  return (
    <>
    {videos.map((video)=>(
          <Grid key={video.id}>
         
          <Box className={classes.card}>
            <Box className={classes.image}>
              <Link href={`/video/${video.id}`}>
              <Image src={video.image_url} width={400} height={400} alt="dummy" />
              </Link>
            </Box>
            <Box className={classes.cardText}>
              <Box component={"h3"}><Link href={`/video/${video.id}`}>{video.title}</Link></Box>
              <Box component={"p"}>
                <span><Link href={`/creator/${video.user_id}`}>{video.name}</Link></span>
                <span>{formatDate(video.created_at)}</span>
              </Box>
            </Box>
          </Box>
          
        </Grid>
        ))}
    </>
  )
}
