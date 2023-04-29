import React,{useState} from 'react';
import {useNavigate} from "react-router-dom" ;
import axios from "axios" ;
import  useToken  from "../auth/useToken";

const OtpVerification = () => {

    const navigate = useNavigate() ;
    const [token,setToken] = useToken() ;
    const [otp , setOtp] = useState("") ;
    const [error , setError] = useState("") ;

    const verifyOtp = async() =>{
        const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/api/otp/${otp}`,{},{
                headers : {Authorization : `Bearer ${token}`} 
            });
        console.log(response) ;
        if(response.status){
            setToken(response.token) ; 
            navigate("/") ;
        }else{
            setError(response.message) ;
        }
    }

  return (
    <div>
        Enter the OTP 
        <small>{error}</small>
        <input type="text" placeholder='Enter the Otp' onChange={(e)=>setOtp(e.target.value)}></input>
        <butto onClick={verifyOtp}>Verify</butto>
    </div>
  )
}

export default OtpVerification