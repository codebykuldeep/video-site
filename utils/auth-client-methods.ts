import { signIn } from "next-auth/react";
import { redirect } from "next/navigation";


export async function sendLoginRequest(email:string,password:string){
    
    try {
        const result = await signIn("credentials", {
            redirect: false,
            email,
            password,
            type:'login'
          });
        
        return result?.error; 
    } catch (error:any) {
        return error.message
    }

    return 'something unexpected happened'
}


export async function sendSignUpRequest(name:string,email:string,password:string){
    
    try {
        const result = await signIn("credentials", {
            redirect: false,
            email,
            password,
            name,
            type:'signin'
          });
        
        return result?.error; 
    } catch (error:any) {
        return error.message
    }

    return 'something unexpected happened'
}