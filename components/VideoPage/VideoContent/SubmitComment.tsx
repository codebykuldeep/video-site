import { Box, Button } from "@mui/material";

import classes from "./video-comment.module.css";
import { FormEvent,  useState } from "react";
import {  VideoCreatorType } from "@/helper/commonTypes";
import { useSession } from "next-auth/react";




interface SubmitCommentProps{
    updateFn:(comment: string) => void
    video:VideoCreatorType
}
export default function SubmitComment({updateFn}:SubmitCommentProps) {
    
    const {status} =useSession();
    const [comment,setComment] =useState('');

    let show = false;
    if(status === 'authenticated'){
        show = true;
    }

    function handleSubmit(event:FormEvent){
        event.preventDefault();

        updateFn(comment);
        setComment('');
        const form = event.target as HTMLFormElement;
        form.reset();

    }


    
  return (
    <>
    {
        show && (
            <Box className={classes.form}>
                <form onSubmit={handleSubmit} >
                <Box className={classes.input}><input type="text" name="comment" onChange={(e)=>setComment(e.target.value)} defaultValue={comment} required/>  </Box>
                <Box className={classes.btn}><Button variant="contained" type="submit" >Comment</Button></Box>
                </form>
            </Box>
        )
    }
    {
        !show && (
            <Box className={classes.message}>Login to comment on the video</Box>
        )
    }
    </>
  )
}
