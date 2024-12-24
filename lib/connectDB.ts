"use server";

import { neon } from "@neondatabase/serverless";

const db = neon(process.env.DB_URL as string);

async function setupDb() {
    await db(`CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name VARCHAR, 
        email VARCHAR UNIQUE,
        password VARCHAR,
        image VARCHAR,
        isVerified BOOLEAN DEFAULT false
      )`);
    await db(`
          CREATE TABLE IF NOT EXISTS videos (
            id SERIAL PRIMARY KEY, 
            image_url VARCHAR NOT NULL,
            video_url VARCHAR NOT NULL,
            cloud_url VARCHAR,
            title VARCHAR NOT NULL, 
            description VARCHAR NOT NULL, 
            category VARCHAR NOT NULL,
            count INTEGER DEFAULT 0,
            created_at VARCHAR DEFAULT CURRENT_TIMESTAMP,
            user_id INTEGER, 
            FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE
          )`);
  
    await db(`
              CREATE TABLE IF NOT EXISTS likes (
                id SERIAL  PRIMARY KEY,
                user_id INTEGER, 
                video_id INTEGER, 
                likeType BOOLEAN ,
                created_at VARCHAR DEFAULT CURRENT_TIMESTAMP,
                UNIQUE(user_id,video_id),
                FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE, 
                FOREIGN KEY(video_id) REFERENCES videos(id) ON DELETE CASCADE
              )`);
    await db(`
                  CREATE TABLE IF NOT EXISTS comments (
                    id SERIAL PRIMARY KEY,
                    user_id INTEGER, 
                    video_id INTEGER, 
                    comment VARCHAR NOT NULL,
                    created_at VARCHAR DEFAULT CURRENT_TIMESTAMP,
                    FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE, 
                    FOREIGN KEY(video_id) REFERENCES videos(id) ON DELETE CASCADE
                  )`);
  
}

await setupDb();

export default db;


// import  pg from 'pg'
// const {Client}  = pg;

// const db = new Client({
//     user: 'postgres',
//     password: 'root',
//     host: 'localhost',
//     port: 5432,
//     database: 'video-site',
//   })

   
// export async function connectDB() {
//     await db.connect();
//     console.log('DB CONNECTED');
// }

// await connectDB();

  

// export default db;