import React,{useState} from 'react';
import {useNavigate} from "react-router-dom";
import axios from "axios" ;

const ForgotPassword = () => {

    const navigate = useNavigate() ;

    const [errorMessage , setErrorMessage] = useState('')
    const [emailValue , setEmailValue] = useState('') ;
    const [success , setSuccess] = useState(false) ;

    const onSubmitClick = async()=>{
        try{
            await axios.put(`${process.env.REACT_APP_SERVER_URL}/api/forgot-password/${emailValue}`) ;
            setSuccess(true) ;
            setTimeout(()=>{
                navigate('/login') ;
            },3000)
        }catch(err){
            setErrorMessage(err.message) ;
        }
    }

  return  success ? (
    <div className='content-container'>
        <h1>Success</h1>
        <p>Check your email for a rest link</p>
    </div>
  ) : (
    <div className='content-container'>
        <h1>Forgot Password</h1>
        <p>Enter your email and we will send you a reset link</p>
        {errorMessage && <div className='fail'>{errorMessage}</div>}
        <input value={emailValue} onChange={(e)=> setEmailValue(e.target.value)} placeholder="abc@gmail.com"/>
        <button disabled={!emailValue} onClick={onSubmitClick}>Send Reset Link</button>
    </div>
  )
}

export default ForgotPassword
