import SearchLayout from '@/components/SearchPage/SearchLayout'

import { redirect } from 'next/navigation';

interface searchPageProps{
  searchParams:Promise<{ query: string }>
}

export const revalidate = 5;


export default async function SearchPage({searchParams}:searchPageProps) {
  const {query} =await searchParams; 
  
  if(!query){
    redirect('/home');
  }
  return (
    <SearchLayout query={query}/>
  )
}
