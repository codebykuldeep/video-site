import { LikeType } from "@/helper/commonTypes";
import db from "./database";

//like - true  || dislike- false
export function updateLike(user_id:string,video_id:string,likeType:boolean){
    const data  = db.prepare('SELECT * FROM likes where user_id =? AND video_id =?').get(user_id,video_id) as LikeType;
    
    if(data){
        if(Number(data.like) === Number(likeType)){
            
            const stmt =db.prepare(`DELETE FROM likes WHERE user_id = ? AND video_id= ?`)
            
            return stmt.run(user_id,video_id);
        }
        const stmt =db.prepare(`UPDATE likes SET like = ? WHERE user_id = ? AND video_id= ?`)
        stmt.run(likeType,user_id,video_id);
    }
    else if(!data){
        const stmt = db.prepare(`
            INSERT INTO likes(like,user_id,video_id)
            VALUES(?,?, ?)`);
        return stmt.run(likeType,user_id,video_id);
    }
}

export function getUserLikeStatus(user_id:string,video_id:string){
    const data  = db.prepare('SELECT like FROM likes where user_id =? AND video_id =?').get(user_id,video_id);
    
    return data;
}

export function getLikesCount(video_id:string){
    const like  = db.prepare('SELECT * FROM likes where video_id =? AND like = 1').all(video_id) as LikeType[];
    const dislike  = db.prepare('SELECT * FROM likes where video_id =? AND like = 0').all(video_id) as LikeType[];
    const likeCount = like.length || 0;
    const dislikeCount = dislike.length || 0
    return [likeCount,dislikeCount];
}


export function deleteALL(){
    // db.prepare('DELETE FROM comments').run();

    db.prepare('DROP TABLE likes').run();
    db.exec(`
        CREATE TABLE IF NOT EXISTS likes (
          like_id INTEGER  PRIMARY KEY,
          user_id INTEGER, 
          video_id INTEGER, 
          like BOOLEAN,
          created_at TEXT DEFAULT CURRENT_TIMESTAMP,
          FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE, 
          FOREIGN KEY(video_id) REFERENCES videos(id) ON DELETE CASCADE
        )`);
}