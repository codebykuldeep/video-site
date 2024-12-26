'use client';

import { Box, Container } from '@mui/material'
import classes from './search-page.module.css'
import { getVideoForQuery } from '@/lib/videos';
import { VideoCreatorType } from '@/helper/commonTypes';
import { useEffect, useState } from 'react';
import SearchVideoLoading from '../Dummy/SearchVideoLoading';
import SearachResult from './SearachResult';




interface searchLayoutProps{
  query: string;
}


export default function SearchLayout({query}:searchLayoutProps) {
  const [loading,setLoading] =useState(true);
  const [result,setResult] = useState<VideoCreatorType[] | null>()

  useEffect(()=>{
    setLoading(true);
    async function getData() {
      const data =await getVideoForQuery(query) as VideoCreatorType[];
      setResult(data);
      setLoading(false);
    }
    getData();
    
  },[query])
  
  return (
    <Container maxWidth='lg' className={classes.container}>
        <Box className={classes.text}>
            Search Result for your {query}
        </Box>
        {loading ? <SearchVideoLoading/> : <SearachResult videos={result!} ></SearachResult>}
    </Container>
  )
}




