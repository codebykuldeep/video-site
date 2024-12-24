import { serverSession } from "@/auth";
import { updateLike } from "@/lib/likes";

export async function POST(req:Request){
    const data =await req.json();
    const session =await serverSession();
    if(!session){
        return Response.json({ sucess:'failed',message:'Unauthenticated to update like' })
    }
    const user = session.user;
    const user_id = user.id as string;
    const {video_id,like} =data;
   

    try { 
        await updateLike(user_id,video_id,like);
    } catch {
        return Response.json({ sucess:'failed',message:'Unauthenticated to update like' })
    }
    
    
    return Response.json({ sucess:'uploaded' })
    
}