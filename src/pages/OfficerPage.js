import { Link } from 'react-router-dom';
import '../css/OfficerPage.css'
import { getAllIssuesAPI } from '../services/apiCalls';
import { updateStatusAPI } from '../services/apiCalls';
import { useEffect, useState } from 'react';
const OfficerPage = () => {
    const [issues, setIssues] = useState([]);
    const token = localStorage.getItem("token");
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await getAllIssuesAPI();
                setIssues(res.data.data);
            }
            catch (err) {
                console.log(err.response?.data);
            }
        };
        fetchData();
    }, []);
    const handleStatus = async (id, status) => {
        try {
            const res = await updateStatusAPI({
                issueId: id,
                status: status
            });
            setIssues((prev) =>
                prev.map((item) =>
                    item._id === id ? { ...item, status } : item
                )
            );
        }
        catch (err) {
            console.log(err.response?.data);
        }
    };
    const sortedIssues = [...issues].sort((a, b) => {
        if (a.issuetype === "Urgent Issue" && b.issuetype !== "Urgent Issue") return -1;
        if (a.issuetype !== "Urgent Issue" && b.issuetype === "Urgent Issue") return 1;
        return 0;
    });
    return (
        <div className='officer-complaint-container'>
            <h2 className="officer-title-complaints">Welcome To Officer Department</h2>
            {issues.length === 0 ? (
                <p className="officer-no-complaint-tag">No Complaints Found</p>
            ) : (
                <div className="officer-grid-container">
                    {sortedIssues.map((item) => (
                        <div key={item._id} className="officer-complaint-card">
                            <img src={item.image} alt="issue" className="officer-complaint-image" />
                            <div className="officer-complaint-content">
                                <h3 className="title-officer-complaint">{item.subject}</h3>
                                <p className="officer-details"><strong>Type: </strong>{item.issuetype}</p>
                                <p className="officer-details"><strong>Department: </strong>{item.department}</p>
                                <p className="officer-details"><strong>Location: </strong>{item.location}</p>
                                <p className="officer-desc"><strong>Description: </strong>{item.description}</p>
                                <p>
                                    <strong>Status: </strong>
                                    <span className={`status ${item.status}`}>
                                        {item.status}
                                    </span>
                                </p>
                                <button disabled={item.status !== "Pending"} onClick={() => handleStatus(item._id, "Accepted")}>
                                    Accept
                                </button>
                                <button disabled={item.status !== "Accepted"} onClick={() => handleStatus(item._id, "Resolved")}>
                                    Resolve
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}
export default OfficerPage;