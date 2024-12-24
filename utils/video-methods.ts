'use server';

import { updateViewCount } from "@/lib/videos";

export async function updateViews(id:string){
    
    await updateViewCount(id);
    
}

// export async function commentAction(video_id:string,formData:FormData) {
//     const comment = formData.get('comment');
//     const session =await serverSession();
//     let user;
//     if(!session){
//         return;
//     }
//     user = session.user;
    

//     addComment(comment as string,video_id,user.id as string); 

//     return  getCommentsById(video_id);
    
// }

