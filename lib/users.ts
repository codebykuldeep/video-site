import {  UserType } from "@/helper/commonTypes";
import db from "./connectDB";


export async  function getAllUser(){
    const data  = await db('SELECT * FROM users');
    
    return data;
}
export async function insertUser(user:UserType){
    
    const res = await db(`
        INSERT INTO users(name, email, password,image)
        VALUES( $1 ,  $2 , $3 , $4) RETURNING * ;` , [user.name, user.email, user.password,'/image/user.png']);
        
        return res[0] ;
}
export async function insertUserAll(user:UserType){
    
    const res = await db(`
        INSERT INTO users(id,name, email, password,image,isVerified)
        VALUES( $1, $2, $3, $4 , $5 ,false)`,[user.id,user.name, user.email, user.password,user.image]);
        
    return res;
        
} 

export async function getUser(email:string){
    
    const res = await db(`SELECT * FROM users WHERE LOWER(email) = $1`,[email.toLowerCase()])
    
    return res.length ? res[0] : undefined;
}


export async function getUserById(id:string){
    const res =await db(`SELECT * FROM users WHERE id = $1`,[id]);
    return res.length ? res[0] : undefined;
}

export async function userVerificationStaus(user:UserType){
    const res = await db(`UPDATE users SET isVerified = 1 WHERE LOWER(email) = $1`,[user.email.toLowerCase()])
    return res;
}
export async function updateWholeUserProfile(user:UserType){
    const res = await db(`UPDATE users SET name = ? ,image= ?, isVerified = 1 WHERE LOWER(email) = $1`,[user.name,user.image,user.email.toLowerCase()]);
    return res
}

export async function updateUserPhoto(image:string,id:string){
    const res =await db(`UPDATE users SET image= $1 WHERE id = $2 ;`,[image,id]);
    return res;
}


export async function providerUser(user:UserType){
    try {
        try {
            const userInDB = await getUser(user.email)
            if(!userInDB){
                await insertUserAll(user);
            }
            updateWholeUserProfile(user);
        } catch (error:unknown) {
            throw new Error((error as Error)?.message)
        }
    } catch (error:unknown) {
        throw new Error((error as Error)?.message)
    }
}

