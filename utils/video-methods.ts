'use server';

import { serverSession } from "@/auth";
import { addComment, getCommentsById } from "@/lib/comment";
import { updateViewCount } from "@/lib/video";

export async function updateViews(id:string){
    
    updateViewCount(id);
    
}

export async function commentAction(video_id:string,formData:FormData) {
    const comment = formData.get('comment');
    const session =await serverSession();
    let user;
    if(!session){
        return;
    }
    user = session.user;
    

    addComment(comment as string,video_id,user.id as string); 

    return  getCommentsById(video_id);
    
}

