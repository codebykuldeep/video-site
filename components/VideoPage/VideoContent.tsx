import React from 'react'
import VideoPlayer from './VideoContent/VideoPlayer'
import VideoDetail from './VideoContent/VideoDetail'
import VideoComment from './VideoContent/VideoComment'
import { CommentUserType, VideoCreatorType } from '@/helper/commonTypes';
import { getCommentsById } from '@/lib/comments';


export default async function VideoContent({video}:{video:VideoCreatorType}) {
 
  const comments =await getCommentsById(video.id);
  
  return (
    <>
    <VideoPlayer video={video }/>
    <VideoDetail video={video }/>
    <VideoComment video={video} comments={comments as CommentUserType[]}/>
    </>
  )
}
