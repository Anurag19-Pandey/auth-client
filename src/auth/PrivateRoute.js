import {Route , Navigate} from "react-router-dom";
import useUser from "./useUser";

const PrivateRoute = ({children}) => {
 
    const user = useUser() ;

    if(!user) return <Navigate to={"/login"}/>

    return children;
}

export default PrivateRoute