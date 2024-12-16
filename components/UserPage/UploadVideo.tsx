'use client';
import { Box } from "@mui/material";
import classes from './UploadForm/upload-video.module.css'
import UploadForm from "./UploadForm/UploadForm";
import UploadButton from "./UploadForm/UploadButton";
import { useActionState, useEffect, useState } from "react";
import { uploadAction } from "@/utils/form-method";
import { validateFormState, validateResult, validation } from "@/helper/validation";
import { formActionState, VideoFormType } from "@/helper/commonTypes";

const initalState:formActionState={
  status:'none',
  message:''
}

export default function UploadVideo() {
    
    const [state,formAction,isPending] =useActionState(uploadAction,initalState);
    const [formState,setFormState] = useState<VideoFormType>(initialformState);
  

  function inputValidation(fieldName:string,fieldValue:string){
    const [text,status] =validation(fieldName,fieldValue);
    setFormState((prev) => ({
      ...prev,
      [fieldName]: {
        status: status,
        message: text,
        value:fieldValue,
      },
    }));
    
    }
    
    const ValidationResult = (validateResult(formState)); //true - all fields correct and filled
  

  function handleChange(event:React.ChangeEvent < HTMLInputElement >){
    inputValidation(event.target.name,event.target.value);
  
  }
  function handleBlur(event:React.FocusEvent< HTMLInputElement>){
    inputValidation(event.target.name,event.target.value);
  }

  function handleValidation(){
    setFormState(validateFormState(formState));
  }
  function handleMedia(mediaName:string){
    setFormState(prev=>({...prev,
        [mediaName]:{
            status:false,
            message:'',
            value:'uploaded'
        }
    }))
  }

  
  useEffect(()=>{
    if(state.status === 'success'){
      setFormState(initialformState);
    }
    if(state.status === 'failed'){
      setFormState(prev=>({
        ...prev,
        image:initialformState.image,
        video:initialformState.video
      }))
    }
  },[state])
    
  return (
    <Box className={classes.uploadbox}>
        <Box component={'h3'}>Upload a video</Box>
        <Box>
            <form action={formAction} className={classes.form} >

                <UploadForm handleBlur={handleBlur} handleChange={handleChange} formState={formState}  handleMedia={handleMedia}/>
                {
                    state.status === 'failed' && (
                        <div className={classes.uploadError}>
                            {<p>{state.message}</p>}
                        </div>
                    )
                }
                {
                    state.status === 'success' && (
                        <div className={classes.success}>
                            {<p>{state.message}</p>}
                        </div>
                    )
                }
                <UploadButton isPending={isPending} onClick={handleValidation} disabled={!ValidationResult}>{isPending ? 'Uploading' : 'Upload'}</UploadButton>
            </form>
        </Box>
    </Box>
  )
}



const initialformState:VideoFormType ={
    title:{
        status:false,
        message:'',
        value:''
    },
    description:{
        status:false,
        message:'',
        value:''
    },
    category:{
        status:false,
        message:'',
        value:''
    },
    image:{
        status:true,
        message:'',
        value:''
    },
    video:{
        status:true,
        message:'',
        value:''
    },
}






