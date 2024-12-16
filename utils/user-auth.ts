"use server";

import { serverSession } from "@/auth";
import { credType } from "@/helper/authTypes";
import { UserType } from "@/helper/commonTypes";
import { serverValidation } from "@/helper/validation";
import { getUser, insertUser, insertUserAll, updateWholeUserProfile } from "@/lib/user";
import { User } from "next-auth";
import { useSession } from "next-auth/react";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";


export async function getUserForAuth(credentials:credType) {
    const {type} =credentials as any;
    let user;
    if(type === 'login'){
        try {
           user =await loginAction(credentials as credType);
           return user;
        } catch (error:any) {
           throw new Error(error.message);
        }
       }

       if(type === 'signin'){
         try {
        
            user =await signUpAction(credentials as credType);
            return user;
         } catch (error:any) {
           
           
            throw new Error(error.message);
         }
        }

        return null;
}

export async function signUpAction(credentials: credType) {
  const { name, email, password } = credentials;
  let data: UserType = { name, email, password };
  
  
  const error = serverValidation(data);

  if (Object.entries(error).length > 0) {
    
    throw new Error("Please enter valid inputs !");
  }

  try {

    const user: any = getUser(data.email);
    
    if(user){
        throw new Error('Email exists already')
    }
    const res = insertUser(data);
    
    return {...credentials ,id:res.lastInsertRowid};
  } catch (error: any) {
    throw new Error(error.message)
  }
}

export async function loginAction(credentials: credType) {
  const { email, password } = credentials;
  let data: UserType = { email, password };

  const error = serverValidation(data);
  

  if (Object.entries(error).length > 0) {
    
    throw new Error("Please enter valid inputs !");
  }

  try {
    const user: any = getUser(data.email);
    if(!user){
        throw new Error('User not found.Check your credentials.')
    }
    
    if (user.password === data.password) {
      return user;
    } else {
      throw new Error(`Please check your crendentials`);
    }
  } catch (error: any) {
    throw new Error(error.message);
  }
}

export async function providerloginAction(user:User) {
    try {
        try {
            const userInDB =getUser(user.email as string)
            if(!userInDB){
                insertUserAll(user as UserType);
            }
            updateWholeUserProfile(user as UserType);
        } catch (error:any) {
            throw new Error(error.message)
        }
    } catch (error:any) {
        throw new Error(error.message)
    }
  }



export async function routeProtect(){
    const user = await serverSession();
    
    if(user){
        redirect('/home');
    }
    
}


