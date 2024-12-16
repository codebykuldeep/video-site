import { uploadDataType, VideoCreatorType } from "@/helper/commonTypes";
import db from "./database";



export function insertVideo(id:string,video:uploadDataType){
    const stmt = db.prepare(`
        INSERT INTO videos(title,description,category, image_url, video_url,cloud_url,user_id)
        VALUES(?,?, ?, ?,?,?,?)`);
        return stmt.run(video.title,video.description,video.category,video.image,video.video,video.cloud,id);
}


export function getVideosByUser(id:string){
    const data  = db.prepare('SELECT * FROM videos where user_id =?').all(id);
    return data;
}

export function getMostWatchedVideos(){
    const data  = db.prepare('SELECT * FROM videos ORDER BY count ASC LIMIT 20').all();
    return data;
}


// export function  addCoulumn(){
//     const stmt  = db.exec('ALTER TABLE  videos  ADD COLUMN  category TEXT NOT NULL');
// }

export function getVideosWithCreators(){
    const data  = db.prepare('SELECT * FROM users INNER JOIN videos ON videos.user_id = users.id ORDER BY videos.count DESC LIMIT 4').all();
    return data;
}
export function getVideoWithCreatorById(id:string){
    const data  = db.prepare('SELECT * FROM users INNER JOIN videos ON videos.user_id = users.id AND videos.id = ?').get(id);
    return data;
}

export function getRelatedVideos(category:string){
    const data  = db.prepare('SELECT * FROM users INNER JOIN videos ON videos.user_id = users.id AND category =? ORDER BY count ASC LIMIT 10').all(category);
    return data;
}



export function updateViewCount(id:string){
    const stmt =db.prepare(`UPDATE videos SET count = count + 1 WHERE id = ?`)
    stmt.run(id)
}

export function getVideoForQuery(query:string){
    const data =db.prepare(`SELECT * FROM users INNER JOIN videos ON videos.user_id = users.id`).all() as VideoCreatorType[];
    const tags = query.split(' ');
    

    const result:VideoCreatorType[] | unknown[] =[] ;
    data.forEach((entry)=>{
        tags.forEach((tag)=>{
            tag = tag.toLowerCase();
            
            if(entry.title.toLowerCase().includes(tag)){
                result.push(entry);
                
            }
            
        })
    }) 
    
    return result;
}




 