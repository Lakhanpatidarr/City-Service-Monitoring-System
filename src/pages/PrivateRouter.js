import react from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const PrivateRouter = ({children}) => {
    const isLoggedIn = useSelector((state)=>state.auth.isLoggedIn);
    if(isLoggedIn)
    {
        return children;
    }
    else{
        return <Navigate to="/login/"/>
    }
}
export default PrivateRouter;