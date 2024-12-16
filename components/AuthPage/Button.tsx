import {useFormStatus} from 'react-dom'
import { Button } from '@mui/material'

type fn=()=>void;

export default function ButtonField({children,validate,valid}:{children:string,valid:boolean,validate:fn}) {
    const { pending} = useFormStatus();
  return (
    <Button type={valid ? 'submit' : 'button'} variant="contained" onClick={validate} >{pending ? 'Please wait' : children}</Button>
  )
}
