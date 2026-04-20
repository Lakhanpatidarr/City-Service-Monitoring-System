import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import '../css/SubmitRating.css'
import { ratingAPI } from "../services/apiCalls";
import { toast } from "react-toastify";

const SubmitRating = ({ ratings, setRatings }) => {
    const [loading, setloading] = useState(false);
    const [formData, setformData] = useState({ zone: "", rating: "" });
    const [submitted, setSubmitted] = useState(false);
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
            const response = await ratingAPI(formData);
            if (response.data.success) {
                setRatings((prevRating) => [
                    ...prevRating,
                    { ...formData, rating: Number(formData.rating) }
                ]);
                setformData({ zone: "", rating: "" });
                setSubmitted(true);
                toast.success("Rating Submitted");
            }
        }
        catch (error) {
            toast.error(error.response?.data?.message || "Rating Not Submitted");
        }
        setloading(false);
    }
    if (submitted) {
        return (
            <div className="success-wrapper">
                <div className="success-icon">
                    <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="#4CAF50" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10"></circle>
                        <path d="M16 8l-5.5 6L8 12"></path>
                    </svg>
                </div>
                <h2 className="success-title">Thank you for submit rating</h2>
                <p className="success-message">Thank you! The rating has been submitted successfully.
                    <br /> We will reply to you soon!
                </p>
                <Link to="/" className="go-back-link">Go back</Link>
            </div>
        );
    }
    return (
        <div className="submit-rating">
            {loading ? (
                <div className="center-spinner">
                    <div className="spinner"></div>
                </div>
            ) : (
                <div className="submit-rating-conatiner">
                    <div className="form-container">
                        <form onSubmit={submitHandler}>
                            <div>
                                <h2 className="heading-rating">Give Rating For Indore Zones</h2>
                            </div>
                            <div>
                                <label htmlFor="select-zone" className="label-text">Select Zone</label>
                                <select className="select-option" required name="zone" onChange={changeHandler} value={formData.zone}>
                                    <option value="Select-Zone">--Select Zone--</option>
                                    <option value="Vijay Nagar">Vijay Nagar</option>
                                    <option value="Rajwada">Rajwada</option>
                                    <option value="Palasia">Palasia</option>
                                    <option value="Khajrana">Khajrana</option>
                                    <option value="Bhawarkua">Bhawarkua</option>
                                    <option value="Annapurna">Annapurna</option>
                                    <option value="MG Road">MG Road</option>
                                    <option value="Sarafa">Sarafa</option>
                                    <option value="LIG">LIG</option>
                                    <option value="Chhappan Dukan">Chhappan Dukan</option>
                                </select>
                                <br />
                                <label htmlFor="select-rating" className="label-text">Select Rating</label>
                                <select className="select-option " required name="rating" onChange={changeHandler} value={formData.rating}>
                                    <option value="">--Select Rating--</option>
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
                                </select>
                            </div>
                            <div>
                                <button className="submit-btn-rating">Submit</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    )
}
export default SubmitRating;