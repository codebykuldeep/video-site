import { uploadDataType, VideoCreatorType } from "@/helper/commonTypes";
import db from "./connectDB";



export async function insertVideo(id:string,video:uploadDataType){
    const res = await db(`
        INSERT INTO videos(title,description,category, image_url, video_url,cloud_url,user_id)
        VALUES( $1 , $2 , $3 , $4 , $5 , $6 , $7 )`,
        [video.title,video.description,video.category,video.image,video.video,video.cloud,id]);
        return res;
}


export async function getVideosByUser(id:string){
    const data  =await db('SELECT * FROM videos where user_id = $1' ,[id]);
    return data;
}

export async function getMostWatchedVideos(){
    const data  =await db('SELECT * FROM videos ORDER BY count ASC LIMIT 20');
    return data;
}



export async function getVideosWithCreators(){
    const data  =await db('SELECT * FROM users INNER JOIN videos ON videos.user_id = users.id ORDER BY videos.count DESC LIMIT 4');
    return data;
}
export async function getVideoWithCreatorById(id:string){
    const res  =await db('SELECT * FROM users INNER JOIN videos ON videos.user_id = users.id AND videos.id = $1 ',[id]);
    return res.length ? res[0] : undefined;
}

export async function getRelatedVideos(category:string){
    const data  =await db('SELECT * FROM users INNER JOIN videos ON videos.user_id = users.id AND category = $1 ORDER BY count ASC LIMIT 10' ,[category]);
    return data;
}



export async function  updateViewCount(id:string){
    const res =await db(`UPDATE videos SET count = count + 1 WHERE id = $1 `,[id])
    return res;
}


export async function getVideoForQuery(query:string){
    const tableSQL = `SELECT * FROM users INNER JOIN videos ON videos.user_id = users.id `;
    
    const tags = query.split(' ');
    
    let str = '';
    tags.forEach((tag,index)=>{
        tag = tag.toLowerCase();
        
        if(index === 0){
            str+= `LOWER(title) LIKE '%${tag}%'`
        }
        else{
            str+= `OR LOWER(title) LIKE '%${tag}%'`
        }
        
    })
    const result =await db(`SELECT * FROM (${tableSQL}) as video WHERE ${str}`) as VideoCreatorType[];
    
    return result;
}



 