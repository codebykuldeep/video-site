'use client';
import { updateViews } from '@/utils/video-methods';
import { useParams } from 'next/navigation';
import { useRef, startTransition, useEffect } from 'react'

export default function VideoIncreaseCount() {
    const viewUpdated =useRef<boolean>(false);
    const {id} = useParams<{ id: string;}>()
    

    useEffect(()=>{
        if(!viewUpdated.current && id){
            startTransition(()=>updateViews(id));
            viewUpdated.current = true;
        }
    },[id])
    
    
  return <></>;
}
