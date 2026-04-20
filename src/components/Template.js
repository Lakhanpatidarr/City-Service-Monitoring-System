import React from "react";
import Login from "../pages/Login";
import SignUp from "../pages/SignUp";
import SignupForm from "./SignupForm";
import LoginForm from "./LoginForm";
import { FcGoogle } from "react-icons/fc"
import '../css/Template.css'

const Template = ({ formtype }) => {
    const handleGoogleLogin = () => {
        setTimeout(() => {
            window.location.href = "http://localhost:4000/api/v1/auth/google";
        }, 500);
    };
    return (
        <div className="template-parent">
            <div className="template-child">
                {formtype === "signup" ? (<SignupForm />) : (<LoginForm />)}
                <div className="parent">
                    <div className="underline"></div>
                    <div className="or">Or</div>
                    <div className="underline"></div>
                </div>
                <div>
                    <button className="btn" onClick={handleGoogleLogin}>
                        <FcGoogle />
                        {formtype === "signup" ? "Sign Up With Google" : "Login with Google"}
                    </button>
                </div>
            </div>
        </div>
    )
}
export default Template