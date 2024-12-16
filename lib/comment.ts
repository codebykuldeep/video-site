import db from "./database";

export function getComments(video_id:string){
    const data  = db.prepare('SELECT * FROM comments where video_id =?').all(video_id);
    return data;
}

export function addComment(comment:string,video_id:string,user_id:string){
    const stmt = db.prepare(`
        INSERT INTO comments(comment,user_id,video_id)
        VALUES(?,?, ?)`);
    return stmt.run(comment,user_id,video_id);
}

export function getCommentsById(id:string){
    const data  = db.prepare('SELECT * FROM comments INNER JOIN users ON comments.user_id = users.id  AND comments.video_id = ? ORDER BY created_at DESC').all(id);
    return data;
}


export function deleteALL(){
    // db.prepare('DELETE FROM comments').run();

    db.prepare('DROP TABLE comments').run();
    db.exec(`
        CREATE TABLE IF NOT EXISTS comments (
          id INTEGER PRIMARY KEY,
          user_id INTEGER, 
          video_id INTEGER, 
          comment TEXT NOT NULL,
          created_at TEXT DEFAULT CURRENT_TIMESTAMP,
          FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE, 
          FOREIGN KEY(video_id) REFERENCES videos(id) ON DELETE CASCADE
        )`);
}
