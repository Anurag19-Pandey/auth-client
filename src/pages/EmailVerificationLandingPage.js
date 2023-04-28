import React ,{useState , useEffect} from 'react'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import useToken from '../auth/useToken';
import EmailVerificationSuccess from './EmailVerificationSuccess';
import { EmailVerificationFail } from './EmailVerificationFail';

const EmailVerificationLandingPage = () => {
  console.log("Email Verification Landing Page") ;
  const [isLoading , setIsLoading] = useState(true) ;
  const [isSuccess , setIsSuccess] = useState(false) ;

  const {verificationString} = useParams() ;

  const [, setToken] = useToken() ;

  useEffect(()=>{
    const loadVerification = async()=>{
      try{
        const response = await axios.put(`${process.env.REACT_APP_SERVER_URL}/api/verify-email`,{verificationString});
        const {token} = response.data ;
        setToken(token) ;
        setIsSuccess(true) ;
        setIsLoading(false) ;
      }catch(err){
        console.log("Loading Verification Error") ;
        setIsSuccess(false) ;
        setIsLoading(false) ;
        console.log(err) ;
      }
    }
    loadVerification() ;
  },[setToken , verificationString , setIsSuccess]) ;

  if(isLoading) return <p>Loading....</p> 
  console.log(isSuccess) ;
  if(!isSuccess) return <EmailVerificationFail/>

  return <EmailVerificationSuccess />
}

export default EmailVerificationLandingPage