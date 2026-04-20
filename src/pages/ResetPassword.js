import React from "react";
import { useState } from "react";
import { resetPasswordAPI } from "../services/apiCalls";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import '../css/ResetPassword.css'



const ResetPassword = () => {
    const[loading,setloading] = useState(false);
    const navigate = useNavigate()
    const[formData, setformData] = useState({email:"",password:"",newPassword:"",confirmNewPassword:""});
    const[resetPassword,setresetPassword] = useState(false);
    function changeHandler(event) {
        setformData((preData)=>(
            {
                ...preData,
                [event.target.name]:event.target.value,
            }
        ))
    }
    async function submitHandler(event) {
        event.preventDefault();
        setloading(true);
        try {
            const response = await resetPasswordAPI(formData);
            if(response.data.success) {
                toast.success("Password Change SuccessFully");
                navigate("/login");
                setresetPassword(true);
            }
        }
        catch(error) {
            toast.error(error.response?.data?.message || "Password Not Changed");
        }
        setloading(false);
    }
    return (
        <div className="password-container">
            {loading ? (
                <div className="center-spinner">
                    <div className="spinner"></div>
                </div>
            ) : (
                <div className="password-content">
                    <form onSubmit={submitHandler}>
                        <div className="input-row-password">
                            <input type="email" placeholder="Enter Your Email Addres" required name="email" onChange={changeHandler} value={formData.email}/>
                        </div>
                        <div className="input-row-password">
                            <input type="password" placeholder="Enter Old Password" required name="password" onChange={changeHandler} value={formData.password}/>
                        </div>
                        <div className="input-row-password">
                            <input type="password" placeholder="Enter New Password" required name="newPassword" onChange={changeHandler} value={formData.newPassword}/>
                        </div>
                        <div className="input-row-password">
                            <input type="password" placeholder="Re-Enter New Password" required name="confirmNewPassword" onChange={changeHandler} value={formData.confirmNewPassword}/>
                        </div>
                        <button type="submit" className="password-btn">Change Password</button>
                    </form>
                </div>
            )}
        </div>
    )
}
export default ResetPassword;