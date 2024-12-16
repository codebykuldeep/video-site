import { CircularProgress } from "@mui/material";


export default function loading() {
  return (
    <div className="loading">
        <div><CircularProgress size={80} /></div>
    </div>
  )
}
