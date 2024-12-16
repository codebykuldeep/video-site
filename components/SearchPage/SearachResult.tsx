'use client';
import { VideoCreatorType } from '@/helper/commonTypes'
import classes from './search-page.module.css'
import { Box } from '@mui/material'
import SearchCard from './SearchCard'
import { useState } from 'react'
import DOWN from '@mui/icons-material/ArrowDownward';
import UP from '@mui/icons-material/ArrowUpward';

export default function SearachResult({videos}:{videos:VideoCreatorType[]}) {
    const [result,setResult] =useState<VideoCreatorType[]>(videos);
    const [views,setViews] = useState(false);
    const [date,setDate] = useState(false);


    function handleViewSort(){
        if(!views){
            const sortedArr = result.toSorted((a,b)=>Number(a.count) - Number(b.count));
            setResult(sortedArr)
            setViews(prev=>!prev);
        }
        else{
            const sortedArr = result.toSorted((a,b)=>Number(b.count) - Number(a.count));
            setResult(sortedArr)
            setViews(prev=>!prev);
        }
        
    }
    function handleDateSort(){
        if(!date){
            const sortedArr = result.toSorted((a,b)=>new Date(a.created_at).getTime() - new Date(b.created_at).getTime());
            setResult(sortedArr)
            setDate(prev=>!prev);
        }
        else{
            const sortedArr = result.toSorted((a,b)=>new Date(b.count).getTime() - new Date(a.count).getTime());
            setResult(sortedArr)
            setDate(prev=>!prev);
        }
    }
  return (
    <>
    <Box className={classes.filter}>
        <Box>Filter By</Box>
        <Box >
            <button id='count' onClick={handleViewSort}>
                <span>{views ? <DOWN/> : <UP/>}</span>
                <span>Views</span>
            </button>
        </Box>
        <Box>
            <button id='created_at' onClick={handleDateSort}>
                <span>{date ? <DOWN/> : <UP/>}</span>
                <span>Date</span>
            </button>
        </Box>
    </Box>
    <Box className={classes.result}>
    {(result.map((video,ind)=>(
        <SearchCard  video={video} key={ind}/>
    )))}
    {
      videos.length === 0 && <p>NO videos found for your query</p>
    }
    </Box>
    </>
  )
}
