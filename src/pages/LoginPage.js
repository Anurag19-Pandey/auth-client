import React , {useState , useEffect} from 'react';
import {useNavigate} from "react-router-dom"
import axios from "axios" ;
import useToken from "../auth/useToken" ;
import {useQueryParams} from "../util/useQueryParams" ;

const LoginPage = () => {

    const navigate = useNavigate() ;
    const tok  = (new URLSearchParams(window.location.search)).get("token") ;
    
    const [token , setToken] = useToken() ;

    const [errorMessage , setErrorMessage]  = useState('') ;
    const [emailValue , setEmailValue] = useState('') ;
    const [passwordValue , setPasswordValue] = useState('') ;
    const [googleOAuthUrl , setGoogleOAuthUrl] = useState('') ;
    
    useEffect(()=>{
      if(tok){
          setToken(tok) ;
          navigate('/') ;
      }
    },[tok , setToken , navigate]) ;

    useEffect(() => {
        const loadOauthUrl = async() =>{
          try{
              const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/auth/google/url`) ;
              const {url} = response.data ;
              setGoogleOAuthUrl(url) ;
            }catch(err){
              console.log(err) ;
          }
        }

        loadOauthUrl() ;
    }, []) ;

    const onLogInClicked = async()=>{
       const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/api/login`,{
          email : emailValue ,
          password: passwordValue
        });

        const {token} = response.data ;

        setToken(token) ;

        navigate("/") ;
    }

  return (
    <div className='content-container'>
            <h1>Log In</h1>
            {errorMessage && <div className='fail'>{errorMessage}</div>}
            <input type="email" placeholder="abc@gmail.com" value={emailValue} onChange={e => setEmailValue(e.target.value)}/>
            <input type="password" placeholder="password" value={passwordValue} onChange={e => setPasswordValue(e.target.value)}/>
            <button disabled={!emailValue || !passwordValue} onClick={onLogInClicked}>Log In</button>
            <button onClick={()=>navigate('/forgot-password')}>Forgot Password ?</button>
            <button onClick={()=> navigate('/signup')}>Don't have an account ?</button>
            <button disabled={!googleOAuthUrl} onClick={()=> {window.location.href = googleOAuthUrl}}>Login in with Google</button>
    </div>
  )
}

export default LoginPage
 