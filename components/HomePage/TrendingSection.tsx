import { Box, Container } from "@mui/material";
import classes from "./trending-section.module.css";

import Grid from "@mui/material/Grid2";
import VideoList from "./VideoList";
import { getVideosWithCreators } from "@/lib/video";
import { Suspense } from "react";
import { VideoCreatorType } from "@/helper/commonTypes";
import { waitFunction } from "@/helper/helperFns";
import TrendingVideo from "../Dummy/TrendingVideo";


export const revalidate =60*5;
 


export default function  TrendingSection() {
  return (
    <Container maxWidth="xl" className={classes.trending} id='trending'>
      <Box component={"h2"}>Trending videos</Box>
      <Grid container className={classes.container} direction={'row'} spacing={2}>
        <Suspense fallback={<TrendingVideo/>}>
            <VideoInsert/>
        </Suspense>
      </Grid>
    </Container>
  );
}

async function VideoInsert(){
  const data = getVideosWithCreators();
  await waitFunction(2000);

  return <VideoList videos={data as VideoCreatorType[]} />;
}
