"use client";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import ThumbDownAltOutlinedIcon from "@mui/icons-material/ThumbDownAltOutlined";
import { VideoCreatorType } from "@/helper/commonTypes";
import classes from "./video-content.module.css";
import {  useState } from "react";

import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";



interface LikeSectionProps {
  video: VideoCreatorType;
  like: number;
  dislike: number;
  likeFromDB:{liketype:string};
}

type LikeStatus = "LIKE" | "DISLIKE" | "NULL";
type likeCount = { like: number; dislike: number };

export default function LikeSection({
  video,
  like,
  dislike,
  likeFromDB
}: LikeSectionProps) {
  const [likesCount, setLikesCount] = useState<likeCount>({
    like: +like,
    dislike: +dislike,
  });
  console.log('likeDb',likeFromDB);
  console.log('like',like , "  ",dislike);
  
  const [likeState, setLikeState] = useState<LikeStatus>(!likeFromDB ? 'NULL' :(Boolean(likeFromDB.liketype) ? 'LIKE' : 'DISLIKE'));
  const [likeOnce,setLikeOnce] =useState(Boolean(likeFromDB));
  const {status} = useSession(); 

  
   
   async function handleUpdate(current:LikeStatus){
    if(status !== 'authenticated'){
      redirect('/auth');
      return;
    }
    
    const index = current.toLowerCase();
    if(likeState === current){
      setLikeState('NULL');
      setLikeOnce(false);
      setLikesCount(prev=>({...prev,[index]:prev[index as keyof likeCount] - 1}));
      updateAtDB(current);
      return ;
    }
    
    if(!likeOnce){
      setLikeState(current)
      setLikeOnce(true);
      setLikesCount(prev=>({...prev,[index]:prev[index as keyof likeCount] + 1}));
      updateAtDB(current);
    }
    else{
      const like = current === 'DISLIKE' ? likesCount.like -1 : likesCount.like;
      const dislike =current === 'LIKE' ? likesCount.dislike -1 : likesCount.dislike;
      
      
      setLikesCount(prev=>({like,dislike,[index]:prev[index as keyof likeCount] + 1}));
      setLikeState(current)
      updateAtDB(current);
    }

    

  }

  async function updateAtDB(current:LikeStatus){
    const likeType = current ==='LIKE'? 1 : 0;
    const video_id = video.id;
    await updateLikeAtDB((likeType as unknown) as boolean,video_id);
  }

  async function updateLikeAtDB(like:boolean,video_id:string){
    await fetch('/api/like',{
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify({
            like:like,
            video_id:video_id
        })
      })
}

  return (
    <div className={classes.likes}>
      <span>
        {likeState === "LIKE" ? (
          <ThumbUpIcon onClick={() => handleUpdate("LIKE")} />
        ) : (
          <ThumbUpOutlinedIcon onClick={() => handleUpdate("LIKE")} />
        )}
        <span>{likesCount.like}</span>
      </span>
      <span>
        {likeState === "DISLIKE" ? (
          <ThumbDownIcon onClick={() => handleUpdate("DISLIKE")} />
        ) : (
          <ThumbDownAltOutlinedIcon onClick={() => handleUpdate("DISLIKE")} />
        )}
        <span>{likesCount.dislike}</span>
      </span>
    </div>
  );
}












// const [hasUserLike,setHasUserLike] =useState(Boolean(likeFromDB));

  // function handleUpdate(current:LikeStatus){
    
  //   if((likeState === 'DISLIKE' && current === 'DISLIKE')){
  //     setLikeState('NULL');
      
  //     setLikesCount(prev=>({...prev,dislike:prev.dislike-1}));
  //     return ;
  //   }
  //   if((likeState === 'LIKE' && current === 'LIKE')){
  //     setLikeState('NULL');
  //     hasUserLike.current = false;
  //     setLikesCount(prev=>({...prev,like:prev.like-1}));
  //     return ;
  //   }
  //   else{
  //     let index = current.toLowerCase();
  //     let value:number;
  //     if(hasUserLike){
  //       let like = current === 'DISLIKE' ? likesCount.like -1 : likesCount.like;
  //       let dislike =current === 'LIKE' ? likesCount.dislike -1 : likesCount.dislike;
  //       setLikesCount(prev=>({like,dislike,[index]:prev[index as keyof likeCount] + 1}));
  //     }
  //     else{
  //       setLikesCount(prev=>({...prev,[index]:prev[index as keyof likeCount] + 1}));
  //     }
      
  //   }

  //   setLikeState(current);
  // }

  // async function handleUpdate(current: LikeStatus) {
  //   if (likeState === "DISLIKE" && current === "DISLIKE") {
  //     setLikeState("NULL");
  //     let likevalue = 
  //     setLikesCount((prev) => ({ ...prev, dislike: prev.dislike - 1 }));
  //     return;
  //   }
  //   if (likeState === "LIKE" && current === "LIKE") {
  //     setLikeState("NULL");
  //     setLikesCount((prev) => ({ ...prev, like: prev.like - 1 }));
  //     return;
  //   }
  //   setLikeState(current);
  // }
