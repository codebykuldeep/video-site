import { Box, Container } from "@mui/material"
import classes from './video-page.module.css'
import VideoContent from "./VideoContent"
import RelatedVideo from "./RelatedVideo"
import VideoIncreaseCount from "./VideoIncreaseCount"
import { getVideoWithCreatorById } from "@/lib/video"
import { VideoCreatorType } from "@/helper/commonTypes"
import { notFound } from "next/navigation"

async function PageLayout({ params,}: {params: Promise<{ id: string }>;}) {
  const {id} =await params;
  
  const data = getVideoWithCreatorById(id) as VideoCreatorType;
  if(!data){
    notFound();
  }
  
  return (
    <>
    <Container maxWidth='xl' className={classes.layout}>
        <Box className={classes.player}>
            <VideoContent video={data}/>
        </Box>
        <Box className={classes.related}>
            <RelatedVideo video={data}/>
        </Box>
    </Container>
    <VideoIncreaseCount/>
    </>
  )
}

export default PageLayout