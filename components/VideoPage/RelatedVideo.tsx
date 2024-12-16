import { Box } from '@mui/material'
import classes from './related-video.module.css'
import Image from 'next/image'
import { VideoCreatorType } from '@/helper/commonTypes'
import { Suspense } from 'react'
import { waitFunction } from '@/helper/helperFns'
import RelatedVideoDummy from '../Dummy/RelatedVideoDummy'
import { getRelatedVideos } from '@/lib/video'
import Link from 'next/link'



export default function RelatedVideo({ video}: {video: VideoCreatorType}) {
    
  return (
    <Box className={classes.related}>
        <Box className={classes.container}>
            <Suspense fallback={<RelatedVideoDummy/>}>
                <InsertRelatedVideo  video={video}/>
            </Suspense>
        </Box>
    </Box>
  )
}


async function InsertRelatedVideo({video}:{video:VideoCreatorType}) {
    const data= getRelatedVideos(video.category) as VideoCreatorType[];
    
    
    await waitFunction(2000);
    return (
        <>
        {(data.filter((entry)=>(entry.id!== video.id)).map((entry,index)=>(
                <Box key={index} className={classes.card}>
                <Box className={classes.image}>
                    <Link href={`/video/${entry.id}`}>
                        <Image src={ entry.image_url || '/image/default.jpg'} alt='video thumbnail' width={168} height={94}></Image>
                    </Link>
                </Box>
                <Box className={classes.text}>
                    <Box component={'p'}>
                        <Link href={`/video/${entry.id}`}>
                            {entry.title}
                        </Link>
                    </Box>
                    <Box component={'p'}>
                        <Link href={`/creator/${entry.user_id}`}>
                             {entry.name}
                        </Link>
                    </Box>
                    <Box component={'p'}> <span>{entry.count} views</span></Box>
                </Box>
            </Box>
            )))}
        {(data.filter((entry)=>(entry.id!== video.id)).length === 0 && <p>No related videos...</p>)}
        </>
    )
}
