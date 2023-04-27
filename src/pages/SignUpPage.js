import React , {useState} from 'react';
import {useNavigate} from "react-router-dom"
import useToken from "../auth/useToken" ;
import axios from "axios" ;

const  SignUpPage = () => {

    const [token , setToken] = useToken() ;

    const navigate = useNavigate() ;

    const [errorMessage , setErrorMessage]  = useState('') ;
    const [emailValue , setEmailValue] = useState('') ;
    const [passwordValue , setPasswordValue] = useState('') ;
    const [confirmpasswordValue , setConfirmPasswordValue] = useState('') ;

    const onSignUpClicked = async()=>{
        const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/api/signup`,{
          email : emailValue , 
          password : passwordValue
        });
        console.log(response.data) ;
        const {token} = response.data ;
        setToken(token) ;
        navigate('/verify-email') ;

    }

  return (
    <div className='content-container'>
            <h1>Sign Up</h1>
            {errorMessage && <div className='fail'>{errorMessage}</div>}
            <input type="email" placeholder="abc@gmail.com" value={emailValue} onChange={e => setEmailValue(e.target.value)}/>
            <input type="password" placeholder="password" value={passwordValue} onChange={e => setPasswordValue(e.target.value)}/>
            <input type="password" placeholder="confirm password" value={confirmpasswordValue} onChange={e => setConfirmPasswordValue(e.target.value)}/>
            <button disable={(!emailValue || !passwordValue !== !confirmpasswordValue).toString()} onClick={onSignUpClicked}>Sign Up</button>
            <button onClick={()=> navigate('/login')}>Already have an account ?</button>
    </div>
  )
}

export default SignUpPage
 