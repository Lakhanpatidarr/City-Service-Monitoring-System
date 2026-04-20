import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";


const AdminRoute = ({children}) => {
    const token = localStorage.getItem("token");
    if(!token) {
        return <Navigate to="/login"/>
    }
    const decoded = jwtDecode(token);
    if(decoded.accountType !== "Admin") {
        return <Navigate to="/unauthorized" />;
    }
    return children;
};
export default AdminRoute;