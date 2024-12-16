'use client'
import classes from './auth-page.module.css'
import InpField from './InpField'
import Link from 'next/link'
import { FormEvent, useState } from 'react'
import ButtonField from './Button'
import { errorResult, validateState, validation } from '@/helper/validation'
import { ErrorStateType } from '@/helper/commonTypes'
import { sendSignUpRequest } from '@/utils/auth-client-methods'
import { redirect } from 'next/navigation'

const initialErrorState:ErrorStateType={
  email:{
      status:false,
      message:'',
      value:'',
  },
  password:{
      status:false,
      message:'',
      value:''
  },
  name:{
    status:false,
    message:'',
    value:''
  }
 
}

export default function Signup() {
  const [state,setState] =useState('');
  const [errorState,setErrorState] = useState<ErrorStateType>(initialErrorState);
  const [submit,setSubmit] =useState(false);
  const valid = errorResult(errorState);

  function inputValidation(fieldName:string,fieldValue:string){
    const [text,status] =validation(fieldName,fieldValue);
    setErrorState((prev) => ({
      ...prev,
      [fieldName]: {
        status: status,
        message: text,
        value:fieldValue,
      },
    }));
    
  }

  function handleChange(event:React.ChangeEvent < HTMLInputElement >){
    inputValidation(event.target.name,event.target.value);
  
  }
  function handleBlur(event:React.FocusEvent< HTMLInputElement>){
    inputValidation(event.target.name,event.target.value);
  }

  function handleValidation(){
    setErrorState(validateState(errorState));
  }

  async function handleSubmit(event:FormEvent){
    event.preventDefault();
    if(valid){
      setSubmit(true);
      const {name,email,password} =errorState;
      const message:string = await sendSignUpRequest(name!.value,email.value,password.value)
      
      if(!Boolean(message)){
        
        return redirect('/home');
      }

      setState(message);
      setSubmit(false);
    }
  }
  

  return (
    <div className={classes.box}>
          <h2>Sign Up</h2>
          <form onSubmit={handleSubmit} className={classes.form}>
            <div>
                <InpField title="Name" type="text" place="Enter your name" handleChange={handleChange} handleBlur={handleBlur} errorState={errorState}/>
            </div>
            <div>
                <InpField title="Email" type="text" place="Enter your Email" handleChange={handleChange} handleBlur={handleBlur} errorState={errorState}/>
            </div>
            <div>
                <InpField title="Password" type="password" place="Enter your Password" handleChange={handleChange} handleBlur={handleBlur} errorState={errorState} />
            </div>
            <div className={classes.error}>
              {state && <p>{state}</p>}
            </div>
            <div className={classes.btn}>
              <ButtonField validate={handleValidation} valid={valid}>{submit ? 'Please wait' : 'Sign Up'}</ButtonField>
            </div>
          </form>
          <div>If you are registered user ,<Link href={'/auth?mode=login'}><span className={classes.submit}>Click Here</span></Link></div>
        </div>
  )
}
