import { serverSession } from "@/auth";
import { addComment } from "@/lib/comments";

export async function POST(req:Request){
    const data =await req.json();
    const session =await serverSession();
    if(!session){
        return Response.json({ sucess:'failed',message:'Unauthenticated to add comment' })
    }
    const user = session.user;
    
    
   
    const {comment,video_id} =data
    
    const user_id = user.id as string;
    try {
        await addComment(comment,video_id,user_id);
    } catch { 
        return Response.json({ sucess:'failed',message:'failed to add comment' })
    }
    
    
    return Response.json({ sucess:'uploaded' })
    
}