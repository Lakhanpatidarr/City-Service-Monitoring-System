import React from "react";
import '../css/ViewResolvedComplaint.css'
import { getResolvedIssuesAPI } from "../services/apiCalls";
import { useState, useEffect } from "react";

const ViewResolvedComplaints = () => {
    const [issues, setIssues] = useState([]);
    const token = localStorage.getItem("token");
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await getResolvedIssuesAPI();
                setIssues(res.data.data);
            }
            catch (err) {
                console.log(err.response?.data);
            }
        };
        fetchData();
    }, []);
    return (
        <div className='resolved-complaint-container'>
            <h2 className="resolved-title-complaints">Resolved Complaints</h2>
            {issues.length === 0 ? (
                <p className="resolved-no-complaint-tag">No Resolved Complaint Found</p>
            ) : (
                <div className="resolved-grid-container">
                    {issues.map((item) => (
                        <div key={item._id} className="resolved-complaint-card">
                            <img src={item.image} alt="issue" className="resolved-complaint-image" />
                            <div className="resolved-complaint-content">
                                <h3 className="title-resolved-complaint">{item.subject}</h3>
                                <p className="resolved-details"><strong>Type: </strong>{item.issuetype}</p>
                                <p className="resolved-details"><strong>Department: </strong>{item.department}</p>
                                <p className="resolved-details"><strong>Location: </strong>{item.location}</p>
                                <p className="resolved-desc"><strong>Description: </strong>{item.description}</p>
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
        </div>
    )
}
export default ViewResolvedComplaints