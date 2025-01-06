'use server';

import { serverSession } from "@/auth";
import { formActionState, uploadDataType, UserType } from "@/helper/commonTypes";
import { serverValidation } from "@/helper/validation";
import { insertVideo } from "@/lib/videos";
import { writeFile } from "fs/promises";
import path from "path";
import cloudinary from '@/utils/cloudinary'
import fs from 'fs'

import { updateUserPhoto } from "@/lib/users";
import { revalidatePath } from "next/cache";




export async function uploadAction(prevState:formActionState,formData:FormData):Promise<formActionState> {
    const title =formData.get('title');
    const description = formData.get('description');
    const category = formData.get('category');
    const image = formData.get('image');
    const video =formData.get('video');
    const data = {title,description,category,image,video} as uploadDataType;
    
   
    const session =await serverSession();
    
    if(!session){
        return {status:'failed',message:'invalid session .Please login and try again'}
    }
    const user =session.user as UserType;
    const error = serverValidation(data);
    if (Object.entries(error).length > 0) {
    
         return {status:'failed',message:"Please enter valid inputs and ensure you uploaded files !"};
    }


    
    try {
        const Imagefilename = await writeFileOnServer(image as File);
        const Videofilename = await writeFileOnServer(video as File) 

        const ImagePath = path.join(process.cwd(), "public/video/" + Imagefilename);
        const VideoPath = path.join(process.cwd(), "public/video/" + Videofilename);
        const {secure_url:imgURL} =  await UploadFileToCloud(ImagePath,'image')
        const {secure_url:cloudURL,playback_url:videoURL} = await UploadFileToCloud(VideoPath,'video');
        deleteFile(VideoPath);
        deleteFile(ImagePath);

        data.image = imgURL;
        data.video = videoURL;
        data.cloud = cloudURL;
        
        try {
            await insertVideo(user.id as string,data)
        } catch {
        return { status:'failed', message:'Failed to upload the video.Please try later...'};
        }
    } catch {
        return { status:'failed', message:'Files uploading failed.Please try later ...'}
    }
    
    revalidatePath('/user','page')
    return { status:'success', message:'Upload successfully !'};
}

export async function uploadPicAction(prevState:formActionState,formData:FormData):Promise<formActionState>{
    const image = formData.get('image') as File;
    
    if(image.size === 0){
        return {status:'failed',message:"Please upload a Image !"};
    }
    const session =await serverSession();
    
    if(!session){
        return {status:'failed',message:'invalid session .Please login and try again'}
    }
    const user =session.user as UserType;

    try {
        const Imagefilename = await writeFileOnServer(image);
        const ImagePath = path.join(process.cwd(), "public/video/" + Imagefilename);
        const {secure_url:imgURL} =  await UploadFileToCloud(ImagePath,'image')
        deleteFile(ImagePath);
        await updateUserPhoto(imgURL,user.id as string);
    } catch(error) {
        let msg = '';
        if(typeof error === 'string'){
            msg = error
        }
        else{
            msg = (error as {message:string}).message;
        }
        console.log(error);
        return {status:'failed',message:msg}
    }
    revalidatePath('/user','page')
    return {status:'success',message:'Upload successful.'};
}

function deleteFile(path:string){
    fs.unlink(path,function(err){
        if (err) {
          throw new Error( err.message);
        } else {
          console.log("Successfully deleted the file.")
        }
        })
}


async function UploadFileToCloud(path:string,type:'video' | 'image'){
    const result = await cloudinary.uploader.upload(path,{ folder: "video_site",resource_type:type});
    
    return result;
}


async function writeFileOnServer(file:File){
    const fileBuffer = Buffer.from(await file.arrayBuffer())
    const filename =  file.name.replaceAll(" ", "_");
    await writeFile(
        path.join(process.cwd(), "public/video/" + filename),
        fileBuffer
      );
    return filename;
}

