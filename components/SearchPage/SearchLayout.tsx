import { Box, Container } from '@mui/material'
import classes from './search-page.module.css'
import { getVideoForQuery } from '@/lib/videos';
import { VideoCreatorType } from '@/helper/commonTypes';
import { waitFunction } from '@/helper/helperFns';
import { Suspense } from 'react';
import SearchVideoLoading from '../Dummy/SearchVideoLoading';
import SearachResult from './SearachResult';


interface searchLayoutProps{
  query: string;
}


export default async function SearchLayout({query}:searchLayoutProps) {
  
  return (
    <Container maxWidth='lg' className={classes.container}>
        <Box className={classes.text}>
            Search Result for your {query}
        </Box>
        <Suspense fallback={<SearchVideoLoading/>}>
          <InsertSearch query={query}/>
        </Suspense>
    </Container>
  )
}


async function InsertSearch({query}:searchLayoutProps) {
  const result =await getVideoForQuery(query) as VideoCreatorType[];
  await waitFunction(2000);
  return (
   <SearachResult videos={result}></SearachResult>
  )
}
