import React , {useEffect} from 'react'
import {useNavigate} from "react-router-dom" ;

const VerifyEmailPage = () => {

    const navigate = useNavigate() ;

    useEffect(()=>{
        setTimeout(()=>{
            navigate('/') ;
        },3000) ;
    },[navigate]) ;

    return (
    <div className='content-container'>
        <h1>Thank for Signing Up</h1>
        <p>
            A verification email has been sent to the email address you provided.Please
            verify your email. 
        </p>
    </div>
  )
}

export default VerifyEmailPage