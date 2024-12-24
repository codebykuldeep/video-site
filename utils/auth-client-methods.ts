import { signIn } from "next-auth/react";


export async function sendLoginRequest(email:string,password:string){
    
    try {
        const result = await signIn("credentials", {
            redirect: false,
            email,
            password,
            type:'login'
          });
        
        return result?.error; 
    } catch (error) {
        if(error instanceof Error)
            return error.message
        
        return String(error);
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
    } catch (error) {
        if(error instanceof Error)
            return error.message;

        return String(error);
    }

    return 'something unexpected happened'
}