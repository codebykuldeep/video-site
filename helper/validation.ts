import { ErrorStateType, ErrorType, uploadDataType, UserType, VideoFormType } from "./commonTypes";

function emailValidation(value:string):[string,boolean]{
    if(value.trim()===''){
        return ['This field is required',true];
    }

    const pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if(!pattern.test(value)){
        return ['Enter a valid Email',true];
    }
    return ['',false];
}

function passwordValidation(value:string):[string,boolean]{
    value =value.trim();
    if(value ===''){
        return ['This field is required',true];
    }
    if(value !=='' &&  value.length < 6){
        return ['Minimum Password length should be 6',true];
    }
    return ['',false];
}

// function nameValidation(value:string):[string,boolean]{
//     if(value.trim() ===''){
//         return ['This field is required',true];
//     }
//     return ['',false];
// }
function fieldValidation(value:string):[string,boolean]{
    if(value.trim() ===''){
        return ['This field is required',true];
    }
    return ['',false];
}


export function validation(title:string,value:string):[string,boolean]{
   
    title = title.toLowerCase();
    if(title === 'email'){
        return emailValidation(value);
    }

    if(title === 'password'){
        return passwordValidation(value);
    }
    if(title === 'image' || title==='video'){
        
        if(value  === ''){
            return [`Please select a ${title}`,true];
        }
        return ['',false];
    }
    
    return fieldValidation(value);
}
export function validateState(state:ErrorStateType ){
    for(const key in state){
        const value = state[key as keyof ErrorStateType ]?.value as string
       
        const [msg, status] = validation(key,value);
        state = { ...state, [key]: {
            status:status,
            message:msg,
            value:value
        } };
    }
    return state;
}

export function serverValidation(user:UserType|uploadDataType){
    const error:ErrorType={};
    for(const [key,value] of Object.entries(user)){
        const [msg,status] =validation(key,value)
        if(status){
            error[key] =msg;
        }
    }
    return error;
}





export function validateFormState(state:VideoFormType ){
    for(const key in state){
        const value = state[key as keyof VideoFormType ]?.value as string
       
        const [msg, status] = validation(key,value);
        state = { ...state, [key]: {
            status:status,
            message:msg,
            value:value
        } };
    }
    return state;
}

export function validateResult(state:VideoFormType){
    let result = true;
    for(const key in state){
        const status = state[key as keyof VideoFormType ]?.status as boolean;
        const value = state[key as keyof VideoFormType ]?.value as string;
        result =result && !status && Boolean(value)
    }
    return result;
}

export function errorResult(state:ErrorStateType){
    let result = true;
    for(const key in state){
        const status = state[key as keyof ErrorStateType ]?.status as boolean;
        const value = state[key as keyof ErrorStateType ]?.value as string;
        result =result && !status && Boolean(value)
    }
    return result;
}