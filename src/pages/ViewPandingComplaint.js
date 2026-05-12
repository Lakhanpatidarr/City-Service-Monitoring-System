import React from "react";
import '../css/ViewPandingComplaint.css'
import { getPendingIssuesAPI } from "../services/apiCalls";
import { useState, useEffect } from "react";

const ViewPandingComplaints = () => {
    const [issues, setIssues] = useState([]);
    const [loading, setloading] = useState(false);
    const token = localStorage.getItem("token");
    useEffect(() => {
        const fetchData = async () => {
            setloading(true);
            try {
                const res = await getPendingIssuesAPI();
                setIssues(res.data.data);
            }
            catch (err) {
                console.log(err.response?.data);
            }
            setloading(false);
        };
        fetchData();
    }, []);
    return (
        <div className='pending-complaint-container'>
            {loading ? (
                <div className="center-spinner">
                    <div className="spinner"></div>
                    <p className="loading-text">Loading Complaints...</p>
                </div>
            ) : (
                <>
                    <h2 className="pending-title-complaints">Pending Complaints</h2>
                    {issues.length === 0 ? (
                        <p className="pending-no-complaint-tag">No Pending Complaint Found</p>
                    ) : (
                        <div className="pending-grid-container">
                            {issues.map((item) => (
                                <div key={item._id} className="pending-complaint-card">
                                    <img src={item.image} alt="issue" className="pending-complaint-image" />
                                    <div className="pending-complaint-content">
                                        <h3 className="title-pending-complaint">{item.subject}</h3>
                                        <p className="pending-details"><strong>Type: </strong>{item.issuetype}</p>
                                        <p className="pending-details"><strong>Department: </strong>{item.department}</p>
                                        <p className="pending-details"><strong>Location: </strong>{item.location}</p>
                                        <p className="pending-desc"><strong>Description: </strong>{item.description}</p>
                                        <p>
                                            <strong>Status: </strong>
                                            <span className={`status ${item.status}`}>
                                                {item.status}
                                            </span>
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </>
            )}
        </div>
    )
}
export default ViewPandingComplaints