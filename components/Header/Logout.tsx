'use client';
import { Box } from '@mui/material'
import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import { redirect, usePathname } from 'next/navigation';


export default function Logout() {
    const pathname = usePathname()
    const {status} =useSession();
    let show =false;
    if(status === 'authenticated')
      show =true;
    
    
    function handleLogout(){
        signOut({redirect:false});
        if(pathname.includes('/user')){
            redirect('/home');
        }
    }
  return (
    <>
    {show ? (
          <>
            <Box ><Link href={'/user'}>Profile</Link></Box>
            <Box onClick={handleLogout}>Logout</Box>
          </>
        ) : <Box ><Link href={'/auth?mode=login'}>Login</Link></Box>}
    </>
  )
}
