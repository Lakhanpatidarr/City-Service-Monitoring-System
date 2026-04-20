import { Link } from "react-router-dom";
import "../css/Dashboard.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Dashboard = () => {
    const navigate = useNavigate();
    const [user,setUser] = useState(null);
    useEffect(()=> {
        try {
            const storedUser = localStorage.getItem("user");
            if(storedUser && storedUser !== "undefined") {
                setUser(JSON.parse(storedUser));
            }
        }
        catch(error) {
            setUser(null);
        }
    },[]);
    if(!user) {
        return <p>Loading...</p>
    }
    return (
        <div className="profile-container">
            <div className="profile-header">
                <img src={user.image || `https://api.dicebear.com/5.x/initials/svg?seed=${user.fullname}`} alt="profile" className="profile-img"/>
                 <div className="profile-info">
                    <h2>{user.fullname || "User"}</h2>
                    <p>{user.email || "No Email"}</p>
                    <Link to="/updateprofile" className="update-link">✏️ Update your profile</Link>
                </div>
            </div>
            <div className="info-card">
                <h3>Profile Details</h3>
                <div className="info-row">
                    <p><strong>Full Name</strong>{user?.additionalDetails?.fullname || user?.fullname || "Not set"}</p>
                </div>
                <div className="info-row">
                    <p><strong>Email:</strong>{user?.additionalDetails?.email || user?.email || "Not set"}</p>
                </div>
                <div className="info-row">
                    <p><strong>Phone:</strong>{user?.additionalDetails?.phoneno|| "Not set"}</p>
                </div>
                <div className="info-row">
                    <p><strong>Address:</strong>{user?.additionalDetails?.address || "Not set"}</p>
                </div>
            </div>
            <div className="dashboard-card">
                <h2 className="dashboard-title-small">Platform Details</h2>
                <div className="platform-btns">
                    <button onClick={()=>navigate("/all-complaints")}>View All Complaints</button>
                    <button onClick={()=>navigate("/panding-complaints")}>View Pending Complaint</button>
                    <button onClick={()=>navigate("/resolved-complaints")}>View Resolved Complaint</button>
                    {user.accountType === "SuperAdmin" && (
                        <button onClick={()=>navigate("/super-admin")}>Super Admin Panel</button>
                    )}
                    {user.accountType === "Admin" && (
                        <button onClick={()=>navigate("/admin")}>Admin Panel</button>
                    )}
                    {user.accountType === "Officer" && (
                        <button onClick={()=>navigate("/officer")}>Officer Panel</button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;