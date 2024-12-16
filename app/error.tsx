'use client';


export default function Error({error}:{error:Error}) {
  return (
    <div className="error-page">
        <div className="error-message">
            <div>Something Unexpected happened...</div>
            <div>Error Occurred</div>
            <div>{error.message}</div>
            <div>Please try again later ✌</div>
        </div>
    </div>
  )
}
