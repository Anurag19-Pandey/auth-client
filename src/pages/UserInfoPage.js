import React , {useState , useEffect }from 'react'
import { useNavigate } from 'react-router-dom'
import  useToken  from "../auth/useToken";
import useUser from "../auth/useUser" ;
import axios from "axios" ;

const UserInfoPage = () => {

    const navigate = useNavigate() ;

    const user = useUser() ;

    const [token,setToken] = useToken() ;

    const {id , email , info } = user ;
 
    const [favouriteFood , setfavouriteFood] = useState(info.favouriteFood ||'');
    const [name , setName] = useState(info.name ||'');
    const [bio , setBio] = useState(info.bio || '');
    const [ShowSuccessMessage , setShowSuccessMessage] = useState(false) ;
    const [ShowFailureMessage , setShowFailureMessage] = useState(false)

    const saveChanges = async()=>{
        try{
            const response = await axios.put(`http://localhost : 5000/api/users/${id}`,{
                favouriteFood ,
                name , 
                bio
            },{
                headers : {Authorization : `Bearer ${token}`} 
            });
    
            
        const {token : newToken } = response.data ;
        setToken(newToken) ;
        setShowSuccessMessage(true);
    }
    catch(err){
            setShowFailureMessage(true) ;
    }
       
    }

   
    
    const logOut = ()=>{
        
    }

    const resetValue = ()=>{
        setfavouriteFood(info.favouriteFood);
        setName(info.name);
        setBio(info.bio) ;
    }

  return (
    <div className='content-container'>
        <h1>{email}</h1>
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

export default UserInfoPage