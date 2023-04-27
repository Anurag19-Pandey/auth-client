import React from 'react'
import {useNavigate} from "react-router-dom" ;

const PasswordResetFail = () => {
    
    const navigate = useNavigate() ;

  return (
    <div className='content-container'>
    <h1>Uh oh...</h1>
    <p>Something went wrong while resetting your password.</p>
    <button onClick={()=> navigate('/login')}>Log In</button>
</div>
  )
}

export default PasswordResetFail