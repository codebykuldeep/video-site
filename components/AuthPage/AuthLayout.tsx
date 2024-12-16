'use client';
import classes from "./auth-page.module.css";
import Login from "./Login";
import Signup from "./Signup";
import { useSearchParams } from 'next/navigation'
  
export default function AuthLayout() {
  const searchParams = useSearchParams()
 
  const mode = searchParams.get('mode')
  return (
    <div className={classes.container}>
      <div className={classes.overlay}>
        {mode !== 'signup' &&  <Login/> }
        {mode === 'signup' && <Signup/> }
      </div>
    </div>
  );
}
