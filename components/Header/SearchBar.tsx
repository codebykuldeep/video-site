'use client';
import classes from './search-bar.module.css'
import SearchSharpIcon from '@mui/icons-material/SearchSharp';
import { FormEvent, useRef } from 'react';
import { redirect } from 'next/navigation';


export default function SearchBar() {
  const inputRef =useRef<HTMLInputElement>(null);


  function handleSearch(event:FormEvent){
    event.preventDefault();
    if(!inputRef.current!.value){
      return;
    }
    
    const query = inputRef.current!.value;
    redirect(`/search?query=${query}`)
  }
  return (
    <>
        <form  onSubmit={handleSearch}>
            <div className={classes.search}>
            <button type='submit' className={classes.btn}><SearchSharpIcon/></button>
            <input type="text" className={classes.input} placeholder="Search..." ref={inputRef} />
            </div>
        </form>
    </>
  )
}
