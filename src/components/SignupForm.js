import React, { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible} from "react-icons/ai";
import Template from "./Template"; 
import {Link, useNavigate} from "react-router-dom"
import { toast } from "react-toastify";
import '../css/SignupForm.css'
import { sendOtpAPI } from "../services/apiCalls";

const SignupForm = () => {
    const navigate = useNavigate();
    const[loading,setloading]=useState(false);
    const [formData, setformData] = useState({fullname:"", email:"", password:"", confirmPassword:"", select:"", day:"", month:"", year:""})
    const [showPassword, setshowPassword] = useState(false);
    const [showConfirmPassword, setshowConfirmPassword] = useState(false);
    function changeHandler (event) {
        setformData( (prevData) => (
            {
                ...prevData,
                [event.target.name]:event.target.value
            }
        ) )
    }
    async function submitHandler (event) {
        event.preventDefault();
        setloading(true);
        if(formData.password !== formData.confirmPassword)
        {
            toast.error("Password Do Not Match");
            return;
        }
        try {
            const res = await sendOtpAPI({email:formData.email});
            navigate("/verify-otp", {state: formData});
        }
        catch(error) {
            toast.error("OTP Send Failed");
        }
        setloading(false);
    }
    return (
        <div className="signup-container">
            <form onSubmit={submitHandler} className="signup-form">
                <div>
                    <p>
                        <span className="heading-create">Create An Account</span>      
                        <span className="sub-heading-signup">Already have an account ?<Link to="/login">Log In</Link></span>
                    </p>
                </div>
                <div>
                    <label className="label-full-name">
                        <input className="full-name" required type="text" name="fullname" placeholder="Full Name" onChange={changeHandler} value={formData.fullname}></input>
                    </label>
                </div>
                <div>
                    <label className="label-email">
                        <input className="email" required type="email" name="email" placeholder="Email" onChange={changeHandler} value={formData.email}></input>
                    </label>
                </div>
                <div>
                    <label className="label-password">
                        <input className="signup-password" required type={showPassword ? ("text") : ("password")} name="password" placeholder="Create Password" onChange={changeHandler} value={formData.password}></input>
                        <span className="eye-password" onClick={ () =>setshowPassword((prev)=>!prev)}>
                            {showPassword ? (<AiOutlineEye fill="#AFB2BF"/>) : (<AiOutlineEyeInvisible fill="#AFB2BF"/>)}
                        </span>
                    </label>
                </div>
                <div>  
                    <label className="label-confirm-password">
                        <input className="confirm-password" required type={showConfirmPassword ? ("text") : ("password")} name="confirmPassword" placeholder="Confirm Password" onChange={changeHandler} value={formData.confirmPassword}></input>
                        <span className="eye-confirm-password" onClick={ () =>setshowConfirmPassword((prev)=>!prev)}>
                            {showConfirmPassword ? (<AiOutlineEye fill="#AFB2BF"/>) : (<AiOutlineEyeInvisible fill="#AFB2BF"/>)}
                        </span>
                    </label>
                </div>
                <div>
                    <label className="label-select">
                        <select className="select" required name="select" onChange={changeHandler} value={formData.select}>
                            <option value="" disabled>Select</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Other</option>
                        </select>
                    </label>
                </div>
                <div className="date-of-birth">Date Of Birth</div>
                <div className="day-month-year">
                    <label htmlFor="day">Day</label>
                    <select required name="day" onChange={changeHandler} value={formData.day}>
                        <option value="01">01</option>
                        <option value="02">02</option>
                        <option value="03">03</option>
                        <option value="04">04</option>
                        <option value="05">05</option>
                        <option value="06">06</option>
                        <option value="07">07</option>
                        <option value="08">08</option>
                        <option value="09">09</option>
                        <option value="10">10</option>
                        <option value="11">11</option>
                        <option value="12">12</option>
                        <option value="13">13</option>
                        <option value="14">14</option>
                        <option value="15">15</option>
                        <option value="16">16</option>
                        <option value="17">17</option>
                        <option value="18">18</option>
                        <option value="19">19</option>
                        <option value="20">20</option>
                        <option value="21">21</option>
                        <option value="22">22</option>
                        <option value="23">23</option>
                        <option value="24">24</option>
                        <option value="25">25</option>
                        <option value="26">26</option>
                        <option value="27">27</option>
                        <option value="28">28</option>
                        <option value="29">29</option>
                        <option value="30">30</option>
                        <option value="31">31</option>
                    </select>
                     <label htmlFor="month">Month</label>
                    <select required name="month" onChange={changeHandler} value={formData.month}>
                        <option value="01">01</option>
                        <option value="02">02</option>
                        <option value="03">03</option>
                        <option value="04">04</option>
                        <option value="05">05</option>
                        <option value="06">06</option>
                        <option value="07">07</option>
                        <option value="08">08</option>
                        <option value="09">09</option>
                        <option value="10">10</option>
                        <option value="11">11</option>
                        <option value="12">12</option>
                    </select>
                     <label htmlFor="year">Year</label>
                    <select required name="year" onChange={changeHandler} value={formData.year}>
                        <option value="2025">2025</option>
                        <option value="2024">2024</option>
                        <option value="2023">2023</option>
                        <option value="2022">2022</option>
                        <option value="2021">2021</option>
                        <option value="2020">2020</option>
                        <option value="2019">2019</option>
                        <option value="2018">2018</option>
                        <option value="2017">2017</option>
                        <option value="2016">2016</option>
                        <option value="2015">2015</option>
                        <option value="2014">2014</option>
                        <option value="2013">2013</option>
                        <option value="2012">2012</option>
                        <option value="2011">2011</option>
                        <option value="2010">2010</option>
                        <option value="2009">2009</option>
                        <option value="2008">2008</option>
                        <option value="2007">2007</option>
                        <option value="2006">2006</option>
                        <option value="2005">2005</option>
                        <option value="2004">2004</option>
                        <option value="2003">2003</option>
                        <option value="2002">2002</option>
                        <option value="2001">2001</option>
                        <option value="2000">2000</option>
                    </select>
                </div>
                <button type="submit" className="create-btn">
                    Create Account
                </button>   
            </form>
        </div>
    )
}
export default SignupForm