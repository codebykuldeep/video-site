import db from "./connectDB";

export async function getComments(video_id:string){
    const data  =await db('SELECT * FROM comments where video_id = $1 ',[video_id]);
    return data;
}

export async function addComment(comment:string,video_id:string,user_id:string){
    const res =await db(`
        INSERT INTO comments(comment,user_id,video_id)
        VALUES( $1 , $2 , $3 )` , [comment,user_id,video_id]);
    return res;
}

export async function getCommentsById(id:string){
    const data  =await db('SELECT * FROM comments INNER JOIN users ON comments.user_id = users.id  AND comments.video_id = $1 ORDER BY created_at DESC' , [id]);
    return data;
}