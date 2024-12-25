import { LikeType } from "@/helper/commonTypes";
import db from "./connectDB";

//like - true  || dislike- false
export async function updateLike(user_id:string,video_id:string,likeType:boolean){
    
    const res  =await db('SELECT * FROM likes where user_id = $1 AND video_id = $2' ,[user_id,video_id]);
    const data = (res.length ? res[0] : undefined) as LikeType;
    if(data){
        
        if(Number(data.liketype) === Number(likeType)){
            
            const stmt = await db(`DELETE FROM likes WHERE user_id = $1 AND video_id= $2 ` ,[user_id,video_id])
            
            return stmt;
        }
        
        const stmt = await db(`UPDATE likes SET liketype = $1 WHERE user_id = $2 AND video_id= $3 ` ,[Boolean(likeType),user_id,video_id])
        return stmt;
    }
    else if(!data){
        const stmt =await db(`
            INSERT INTO likes(liketype,user_id,video_id)
            VALUES( $1 , $2 , $3 )` ,[Boolean(likeType),user_id,video_id]);
        return stmt;
    }
}

export async function getUserLikeStatus(user_id:string,video_id:string){
    const res  =await db('SELECT likeType FROM likes where user_id = $1 AND video_id = $2' , [user_id,video_id]);
    
    return res.length ? res[0] : null;
}

export async function getLikesCount(video_id:string){
    const like  =await  db('SELECT * FROM likes where video_id = $1 AND likeType = true' ,[video_id]) as LikeType[];
    const dislike  =await  db('SELECT * FROM likes where video_id = $1 AND likeType = false',[video_id]) as LikeType[];
    const likeCount = like.length || 0;
    const dislikeCount = dislike.length || 0
    return [likeCount,dislikeCount];
}
