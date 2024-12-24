"use server";

import { serverSession } from "@/auth";
import { credType } from "@/helper/authTypes";
import { UserType } from "@/helper/commonTypes";
import { serverValidation } from "@/helper/validation";
import { getUser, insertUser, insertUserAll, updateWholeUserProfile } from "@/lib/users";
import { User } from "next-auth";

import { redirect } from "next/navigation";


export async function getUserForAuth(credentials:credType) {
    const {type} =credentials as {type:string};
    let user;
    
    if(type === 'login'){
        try {
           user =await loginAction(credentials as credType);
           return user;
        } catch (error) {
           throw new Error((error as Error).message);
        }
       }

       if(type === 'signin'){
         try {
        
            user =await signUpAction(credentials as credType);
            return user;
         } catch (error) {
            throw new Error((error as Error).message);
         }
        }

        return null;
}

export async function signUpAction(credentials: credType) {
  const { name, email, password } = credentials;
  const data: UserType = { name, email, password };
  
  
  const error = serverValidation(data);

  if (Object.entries(error).length > 0) {
    
    throw new Error("Please enter valid inputs !");
  }

  try {

    const user = await getUser(data.email);
    
    if(user){
        throw new Error('Email exists already')
    }
    const res = await  insertUser(data);
    
    return {...credentials ,...res};
  } catch (error) {
    throw new Error((error as Error).message)
  }
}

export async function loginAction(credentials: credType) {
  const { email, password } = credentials;
  const data: UserType = { email, password };

  const error = serverValidation(data);
  

  if (Object.entries(error).length > 0) {
    
    throw new Error("Please enter valid inputs !");
  }

  try {
    const user = await getUser(data.email) as UserType;
    if(!user){
        throw new Error('User not found.Check your credentials.')
    }
    
    if (user.password === data.password) {
      return user;
    } else {
      throw new Error(`Please check your crendentials`);
    }
  } catch (error) {
    throw new Error((error as Error).message);
  }
}

export async function providerloginAction(user:User) {
    try {
        try {
            const userInDB = await getUser(user.email as string)
            if(!userInDB){
                await insertUserAll(user as UserType);
            }
            await updateWholeUserProfile(user as UserType);
        } catch (error) {
            throw new Error((error as Error).message)
        }
    } catch (error) {
        throw new Error((error as Error).message)
    }
  }



export async function routeProtect(){
    const user = await serverSession();
    
    if(user){
        redirect('/home');
    }
    
}


