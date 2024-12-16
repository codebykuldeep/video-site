'use client';
import { Box, Button, CircularProgress } from "@mui/material";
import classes from './user-profile.module.css'
import { useActionState, useState } from "react";
import { uploadPicAction } from "@/utils/form-method";
import { formActionState } from "@/helper/commonTypes";
import Image from "next/image";

const initalState:formActionState ={
    status:'none',
    message:''
}

export default function UserProfile() {
    const [image,setImage] =useState<File | null>();
    const [error,setError] =useState<boolean | null>(null);
    const [state,formAction,isPending] =useActionState(uploadPicAction,initalState);

    function handleImage(event:React.ChangeEvent<HTMLInputElement>){
        const fileList = event.target.files;
        if (fileList && fileList.length > 0) {
          setImage(fileList[0]);
          setError(false);
        } else {
          setImage(null);
        }
    }
    function handleFileCheck(){
        
        if(!image || image.size === 0){
            setError(true);
            return ;
        }
        setImage(null);
        setError(false);
    }
  return (
    <Box className={classes.profile}>
        <Box>
            <h3>Update your Profile Photo</h3>
            <form action={formAction} className={classes.form}>
                <Box className={classes.image}>
                    <label htmlFor="image" className={classes.pick}><span>Select Image</span></label>
                    <input
                    type="file"
                    id="image"
                    name="image"
                    accept="image/png, image/gif, image/jpeg"
                    onChange={handleImage}
                    />
                    <div className={classes.demo}>{image && <Image src={URL.createObjectURL(image) } width={100} height={100} alt="" />}</div>
                </Box>
                {error && <p className={classes.error}>Please upload a image</p>}
                {state.status ==='failed' && <p className={classes.error}>{state.message}</p>}
                {state.status ==='success' && <p className={classes.success}>{state.message}</p>}
                <Box className={classes.btn}>
                    
                {/* <label htmlFor="image" className={classes.pickbtn}>
                    Select Image
                </label> */}
                
                <Button onClick={handleFileCheck}
                 type={(error === null || error)  ? 'button' :'submit'}
                 disabled={isPending}
                  variant="contained">{isPending ? 'Updating...' : 'Upload Image'}</Button>
                  {isPending &&  <CircularProgress size="30px" />}
                </Box>
                
            </form>
        </Box>
    </Box>
  )
}
