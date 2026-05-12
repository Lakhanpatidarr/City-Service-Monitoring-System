import React, { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom"
import { toast } from "react-toastify";
import Template from "./Template";
import '../css/LoginForm.css'
import { useDispatch } from "react-redux";
import { setToken } from "../slices/authSlice";
import { loginAPI } from "../services/apiCalls";
import { setUser } from "../slices/profileSlice";

const LoginForm = () => {
    const [loading, setloading] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [formData, setformData] = useState({ email: "", password: "" })
    const [showPassword, setshowPassword] = useState(false);
    function changeHandler(event) {
        setformData((prevData) => (
            {
                ...prevData,
                [event.target.name]: event.target.value
            }
        ))
    }
    async function submitHandler(event) {
        event.preventDefault();
        setloading(true);
        try {
            const response = await loginAPI(formData);
            if (response?.data?.success) {
                localStorage.setItem("token", response.data.token);
                dispatch(setToken(response.data.token));
                if (response.data?.user) {
                    localStorage.setItem("user", JSON.stringify(response.data.user));
                    dispatch(setUser(response.data.user));
                }
                toast.success("Login Successful");
                navigate("/dashboard");
            }
        }
        catch (error) {
            toast.error(error.response?.data?.message || "Login Failed");
        }
        setloading(false);
    }
    return (
        <div>
            {loading ? (
                <div className="center-spinner">
                    <div className="spinner"></div>
                </div>
            ) : (
                <form onSubmit={submitHandler} className="login-form">
                    <div>
                        <p>
                            <span className="heading">Welcome Back !</span>
                            <br />
                            <span className="sub-heading">Login to access your dashboard.</span>
                        </p>
                    </div>
                    <label className="login-label">
                        <input className="email-btn" required type="email" name="email" value={formData.email} placeholder="Enter Email Id" onChange={changeHandler} />
                    </label>
                    <br />
                    <label className="password-label">
                        <input className="password" required type={showPassword ? ("text") : ("password")} name="password" onChange={changeHandler} placeholder="Enter Password" value={formData.password} />
                        <span className="eye" onClick={() => setshowPassword((prev) => !prev)}>
                            {showPassword ? (<AiOutlineEye fontSize={24} fill="#AFB2BF" />) : (<AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />)}
                        </span>
                        <Link to='/reset-password' className="forgot-password">
                            <p>
                                Forgot Password
                            </p>
                        </Link>
                    </label>
                    <button className="loginForm-btn">
                        Login
                    </button>
                    <br />
                    <span className="dont-have-account">Don't have an Account ? <Link to="/signup">Sign Up</Link></span>
                    <br />
                </form>
            )}
        </div>
    )
}
export default LoginForm