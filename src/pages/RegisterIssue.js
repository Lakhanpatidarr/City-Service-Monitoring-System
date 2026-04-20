import React, { useState } from "react";
import '../css/RegisterIssue.css'
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { issueAPI } from "../services/apiCalls";

const RegisterIssue = () => {
    const [loading, setloading] = useState(false);
    const navigate = useNavigate();
    const [formData, setformData] = useState({ fullname: "", email: "", phoneno: "", department: "", subject: "", issuetype: "", description: "", image: null, location: "" });
    const [isSubmitIssue, setisSubmitIssue] = useState(false);
    function changeHandler(event) {
        const { name, value, files } = event.target;
        if (name === "image") {
            setformData((prevData) => (
                {
                    ...prevData,
                    image: files[0]
                }
            ));
        }
        else {
            setformData((prevData) => (
                {
                    ...prevData,
                    [name]: value
                }
            ));
        }
    }
    async function submitHandler(event) {
        event.preventDefault();
        setloading(true);
        try {
            const token = localStorage.getItem("token");
            const form = new FormData();
            for (const key in formData) {
                if (formData[key] !== null) {
                    form.append(key, formData[key]);
                }
            }
            const response = await issueAPI(form, token);
            if (response.data.success) {
                setisSubmitIssue(true);
                toast.success("Thank You For Submitting Issue");
                navigate("/submitrating");
            }
        }
        catch (error) {
            toast.error(error.response?.data?.message || "Please Try Again Letter");
        }
        setloading(false);
    }
    return (
        <div className="registerissue-container">
            {loading ? (
                <div className="center-spinner">
                    <div className="spinner"></div>
                </div>
            ) : (
                <form onSubmit={submitHandler} className="issue-form-registerissue">
                    <div className="form-section-registerissue">
                        <h2 className="section-title-registerissue">Personal Details</h2>
                        <div className="row">
                            <div className="input-group">
                                <label>Full Name</label>
                                <input required type="text" name="fullname" placeholder="Enter Your Name" onChange={changeHandler} value={formData.fullname}></input>
                            </div>
                            <div className="input-group">
                                <label>Email Address</label>
                                <input required type="text" name="email" placeholder="Enter Email" onChange={changeHandler} value={formData.email}></input>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-group">
                                <label>Enter Your Phone:</label>
                                <input required type="tel" name="phoneno" placeholder="123-456-7890" onChange={changeHandler} value={formData.phoneno}></input>
                            </div>
                            <div className="input-group">

                            </div>
                        </div>
                    </div>
                    <div className="form-section-registerissue">
                        <h2 className="section-title-registerissue">Complaint Details</h2>
                        <div className="row">
                            <div className="input-group">
                                <label htmlFor="select-department">select Department</label>
                                <select required name="department" onChange={changeHandler} value={formData.department}>
                                    <option value="Select">--Select--</option>
                                    <option value="Police Department">Police Department</option>
                                    <option value="Municipal Department">Municipal Department</option>
                                    <option value="Fire Department">Fire Department</option>
                                    <option value="Health Department">Health Department</option>
                                    <option value="Tourism Department">Tourism Department</option>
                                    <option value="Infrastructure Department">Infrastructure Department</option>
                                </select>
                            </div>
                            <div className="input-group">
                                <label>Subject</label>
                                <input required type="text" name="subject" placeholder="Subject" onChange={changeHandler} value={formData.subject}></input>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-group">
                                <label htmlFor="select-type">Issue Type</label>
                                <select required name="issuetype" onChange={changeHandler} value={formData.issuetype}>
                                    <option value="Select">--Select--</option>
                                    <option value="Personal Issue">Personal Issue</option>
                                    <option value="Public Issue">Public Issue</option>
                                    <option value="Urgent Issue">Urgent Issue</option>
                                </select>
                            </div>
                            <div className="input-group">
                                <label>Description</label>
                                <input required type="text" name="description" placeholder="Description" onChange={changeHandler} value={formData.description}></input>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-group">
                                <label>Image Upload</label>
                                <input required type="file" name="image" accept="image/*" onChange={changeHandler}></input>
                            </div>
                            <div className="input-group">
                                <label>Location</label>
                                <input required type="text" name="location" placeholder="Location" onChange={changeHandler} value={formData.location}></input>
                            </div>
                        </div>
                    </div>
                    <button className="submit-btn-reportissue">Submit Complaint</button>
                </form>
            )}
        </div>
    )
}
export default RegisterIssue;