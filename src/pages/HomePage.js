import React , {useState , useEffect }from 'react'
import { useNavigate } from 'react-router-dom'
import  useToken  from "../auth/useToken";
import useUser from "../auth/useUser" ;
import axios from "axios" ;

const HomePage = () => {

    const navigate = useNavigate() ;

    const user = useUser() ;

    const [token,setToken] = useToken() ;

    const {id , email , isVerified , info } = user ;
 
    const [favouriteFood , setfavouriteFood] = useState(info.favouriteFood ||'');
    const [name , setName] = useState(info.name ||'');
    const [bio , setBio] = useState(info.bio || '');
    const [ShowSuccessMessage , setShowSuccessMessage] = useState(false) ;
    const [ShowFailureMessage , setShowFailureMessage] = useState(false)

    const saveChanges = async()=>{
        try{
          console.log("called") ;
            const response = await axios.put(`${REACT_APP_SERVER_URL}/api/users/${id}`,{
                favouriteFood ,
                name , 
                bio
            },{
                headers : {Authorization : `Bearer ${token}`} 
            });
    
            console.log(response.data) ;
        const {token : newToken } = response.data ;
        setToken(newToken) ;
        setShowSuccessMessage(true);
    }
    catch(err){
      console.log(err); 
      setShowFailureMessage(true) ;
    }
       
    }

    const logOut = ()=>{
        localStorage.removeItem('token') ;
        navigate('/login')  ;       
    }

    const resetValue = ()=>{
        setfavouriteFood(info.favouriteFood);
        setName(info.name);
        setBio(info.bio) ;
    }

  return (
    <div className='content-container'>
        <h1>{email}</h1>
        {!isVerified && <div className='fail'>You won't be able make any changes until you verify email</div>}
        {ShowSuccessMessage && <div className='success'>{ShowSuccessMessage}</div>}
        {ShowFailureMessage && <div className='fail'>{ShowFailureMessage}</div>}
        <label>
            Name :
            <input onChange={e => setName(e.target.value)}/>
        </label>
        <label>
            Favorite Food :
            <input onChange={e => setfavouriteFood(e.target.value)}/>
        </label>
        <label>
            Bio :
            <input onChange={e => setBio(e.target.value)}/>
        </label>
        <button onClick={saveChanges}>Save Changes</button>
        <button onClick={resetValue}>Reset Value</button>
        <button onClick={logOut}>Log Out</button>
    </div>
  )
}

export default HomePage