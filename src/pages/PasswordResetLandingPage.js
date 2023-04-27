import React,{useState} from 'react'
import {useParams} from "react-router-dom" ;
import PasswordResetSuccess from './PasswordResetSuccess';
import PasswordResetFail from './PasswordResetFail';
import axios from "axios" ;

const PasswordResetLandingPage = () => {

    const {passwordResetCode} = useParams() ;
    
    const [isFailure , setIsFailure] = useState(false) ;
    const [isSuccess , setIsSuccess] = useState(false) ;
    const [passwordValue , setPasswordValue ] = useState('') ;
    const [confirmpasswordValue , setConfirmPasswordValue] = useState('') ;

    const onResetClicked = async()=>{
        try{
            await axios.put(`${process.env.REACT_APP_SERVER_URL}/api/users/${passwordResetCode}/reset-password`,{passwordValue}) ;
            setIsSuccess(true)
        }catch(err){
            console.log(err) ;
            setIsFailure(true) ;
        }
    }

    if(isFailure) return <PasswordResetFail/>
    if(isSuccess) return <PasswordResetSuccess/>
  return (
    <div className='content-container'>
        <h1>Reset Password</h1>
        <p>Please Enter a new Password</p>
        <input type="password" value={passwordValue} onChange={e => setPasswordValue(e.target.value)} placeholder="Password"/>
        <input type="password" value={confirmpasswordValue} onChange={e => setConfirmPasswordValue(e.target.value)} placeholder="Confirm Password"/>
        <button disabled={!passwordValue || !confirmpasswordValue || passwordValue !== confirmpasswordValue} onClick={onResetClicked}>Reset Password</button>
    </div>
  )
}

export default PasswordResetLandingPage
