import { Button, CircularProgress, Stack } from '@mui/material'

interface uploadButtonProps{
  children:string;
  disabled:boolean;
  isPending:boolean;
  onClick:()=>void
}

export default function UploadButton({children,disabled,isPending,onClick}:uploadButtonProps) {
    
  return (
    <>
    <Stack direction={'row'} alignItems={'center'} gap={1.5}>
    <Button onClick={onClick} type={disabled ? "button" :"submit"} disabled={isPending}  variant="contained">{children}</Button>
    {isPending && <CircularProgress size="30px" />}
    </Stack>
    </>
  )
}
