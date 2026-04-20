import React, { useState } from "react";
import '../css/UpdateProfile.css'
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { updateAPI } from "../services/apiCalls";
import { useDispatch } from "react-redux";
import { setUser } from "../slices/profileSlice";

const UpdateProfile = () => {
    const [loading, setloading] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [formData, setformData] = useState({ fullname: "", email: "", phoneno: "", address: "" });
    const [dataUpdate, setdataUpdate] = useState(false);
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
            const response = await updateAPI(formData);
            if (response.data.success) {
                if (response.data?.user) {
                    localStorage.setItem("user", JSON.stringify(response.data.user));
                }
                dispatch(setUser(response.data.user));
                toast.success("Profile Updated Successfully");
                navigate("/dashboard");
                setdataUpdate(true);
            }
        }
        catch (error) {
            toast.error(error.response?.data?.message || "Profile Not Updated");
        }
        setloading(false);
    }
    return (
        <div className="update-container">
            {loading ? (
                <div className="center-spinner">
                    <div className="spinner"></div>
                </div>
            ) : (
                <div className="update-content">
                    <form onSubmit={submitHandler}>
                        <div>
                            <h2 className="update-title">Personal Details</h2>
                            <div className="input-row">
                                <label>Full Name</label>
                                <input required type="text" name="fullname" placeholder="Enter Your Name" onChange={changeHandler} value={formData.fullname}></input>
                            </div>
                            <div className="input-row">
                                <label>Email Address</label>
                                <input required type="email" name="email" placeholder="Enter Email" onChange={changeHandler} value={formData.email}></input>
                            </div>
                            <div className="input-row">
                                <label>Enter Your Phone:</label>
                                <input required type="tel" name="phoneno" placeholder="123-456-7890" onChange={changeHandler} value={formData.phoneno}></input>
                            </div>
                            <div className="input-row">
                                <label>Address</label>
                                <input required type="text" name="address" placeholder="xxx-xxx-xxxx" onChange={changeHandler} value={formData.address}></input>
                            </div>
                        </div>
                        <button type="submit" className="update-btn">Update Profile</button>
                    </form>
                </div>
            )}
        </div>
    )
}
export default UpdateProfile