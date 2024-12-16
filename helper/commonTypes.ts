export type ChangeEvent = React.ChangeEvent < HTMLInputElement > ;

export interface UserType{
    email:string;
    password:string;
    name?:string;
    isVerfied?:boolean;
    image?:string;
    id?:string;
    
}
export interface ErrorStateType{
    email:{
        status:boolean,
        message:string,
        value:string;
    };
    password:{
        status:boolean,
        message:string,
        value:string;
    };
    name?:{
        status:boolean,
        message:string,
        value:string;
    };
}

export interface ErrorType{
    [key:string]:string;
}


export interface VideoFormType{
    title:{
        status:boolean,
        message:string,
        value:string;
    };
    description:{
        status:boolean,
        message:string,
        value:string;
    };
    category:{
        status:boolean,
        message:string,
        value:string;
    };
    image:{
        status:boolean,
        message:string,
        value:string;
    };
    video:{
        status:boolean,
        message:string,
        value:string;
    }
}

export interface userSession{
    name?: string | null
    email?: string | null
    image?: string | null
    id?:string | null;
  }


export interface VideoType{
    id: string,
    image_url: string,
    video_url: string,
    title: string,
    description: string,
    created_at: string,
    user_id: string,
    count: string,
    category: string
  }

  export interface CreatorType{
    name: string;
    email: string,
    password: string,
    image: string,
    isVerified: boolean,
  }

  export interface CommentType{
    id: string;
    user_id: string,
    video_id: string;
    comment: string;
    created_at: string;
  }

  export interface VideoCreatorType extends VideoType,CreatorType{}

  export interface CommentUserType extends CommentType,CreatorType{}

  export interface LikeType{
    id:string;
    like:string;
    user_id:string;
    video_id:string;
  }


  export interface formActionState{
    status:'failed' | 'success' | 'none';
    message:string;
  }

  


//   export interface VideoFormDataType{
//     image: string,
//     video: string,
//     title: string,
//     description: string,
//     cloud: string,
//     category: string
//   }

  export interface uploadDataType{
    title:string;
    description:string;
    category:string;
    image:string;
    video:string;
    cloud:string
    }