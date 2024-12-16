import { Box } from "@mui/material";
import Grid from "@mui/material/Grid2";
import classes from './user-video.module.css';
import Image from "next/image";
import CircleIcon from '@mui/icons-material/Circle';
import { VideoType } from "@/helper/commonTypes";
import { formatDate } from "@/helper/helperFns";
import Link from "next/link";


interface UserVideoProps{
  videos:VideoType[];
}

export default function UserVideo({videos}:UserVideoProps) {

  
  
  if(videos.length === 0){
    return (
      <p>You have not uploaded any videos...</p>
    )
  }
  return (
    <Grid container className={classes.container} direction={"row"} spacing={2}>
      {videos.map((video, val) => (
        <Grid key={val} size={12 / 4}>
          <Link href={`/video/${video.id}`}>
          <Box className={classes.card}>
            <Box className={classes.image}>
              <Image
                src={video.image_url || "/image/default.jpg"}
                alt="dummy"
                width={1000}
                height={1000}
              />
            </Box>
            <Box className={classes.cardText}>
              <Box component={"h3"}>{video.title}</Box>
              <Box component={"p"}>
                <span>{video.count} views</span>
                <span>
                  <CircleIcon />
                </span>{" "}
                <span>{formatDate(video.created_at)}</span>
              </Box>
            </Box>
          </Box>
          </Link>
        </Grid>
      ))}
    </Grid>
  );
}
