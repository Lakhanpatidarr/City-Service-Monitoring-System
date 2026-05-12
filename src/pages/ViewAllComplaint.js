import React, { useEffect, useState } from "react";
import '../css/ViewAllComplaint.css'
import { getMyIssuesAPI } from "../services/apiCalls";

const ViewAllComplaints = () => {
    const [issues, setIssues] = useState([]);
    const [loading, setloading] = useState(false);
    const token = localStorage.getItem("token");
    useEffect(() => {
        const fetchData = async () => {
            setloading(true);
            try {
                const res = await getMyIssuesAPI();
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
        <div className='all-complaint-container'>
            {loading ? (
                <div className="center-spinner">
                    <div className="spinner"></div>
                </div>
            ) : (
                <>
                    <h2 className="title-complaints">All Complaints</h2>
                    {issues.length === 0 ? (
                        <p className="no-complaint-tag">No Complaints Found</p>
                    ) : (
                        <div className="grid-container">
                            {issues.map((item) => (
                                <div key={item._id} className="complaint-card">
                                    <img src={item.image} alt="issue" className="complaint-image" />
                                    <div className="complaint-content">
                                        <h3 className="title-all-complaint">{item.subject}</h3>
                                        <p className="details"><strong>Type: </strong>{item.issuetype}</p>
                                        <p className="details"><strong>Department: </strong>{item.department}</p>
                                        <p className="details"><strong>Location: </strong>{item.location}</p>
                                        <p className="desc"><strong>Description: </strong>{item.description}</p>
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
export default ViewAllComplaints