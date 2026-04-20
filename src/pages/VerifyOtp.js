import React from "react";
import { useLocation,useNavigate } from "react-router-dom";
import { useState } from "react";
import { signupAPI } from "../services/apiCalls";
import "../css/VerifyOtp.css";
import { toast } from "react-toastify";

const VerifyOtp = () => { 
  const location = useLocation();
  const navigate = useNavigate();
  const formData = location.state;
  const [otp, setOtp] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();
    const dob = `${formData.year}-${formData.month}-${formData.day}`;
    const signupData = {fullname:formData.fullname,email:formData.email,password:formData.password,confirmPassword:formData.confirmPassword,select:formData.select,dob:dob,otp:otp};
    try {
      const response = await signupAPI(signupData);
      toast.success("Signup Successful");
      navigate("/login");
    }
    catch(error) {
      toast.error(error.response?.data?.message || "Signup Failed");
    }
  };

  return (
    <div className="verify-otp-page">
        <form onSubmit={submitHandler} className="verify-otp-form">
            <input value={formData.email} disabled />
            <input type="text" placeholder="Enter OTP" value={otp} onChange={(e) => setOtp(e.target.value)} className="input-otp"/>
            <button>Verify OTP</button>
        </form>
    </div>
  );
};
export default VerifyOtp