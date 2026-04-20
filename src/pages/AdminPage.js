import { Link } from 'react-router-dom';
import '../css/AdminPage.css'
import { getAllOfficerAPI } from '../services/apiCalls';
import { getAllIssuesAPI } from '../services/apiCalls';
import { useEffect, useState } from 'react';
const AdminPage = () => {
    const [officers, setOfficers] = useState([]);
    const [search, setSearch] = useState("");
    const [issues, setIssues] = useState([]);
    const token = localStorage.getItem("token");
    useEffect(() => {
        async function fetchOfficers() {
            try {
                const response = await getAllOfficerAPI();
                setOfficers(response.data.data);
            }
            catch (err) {
                console.log(err);
            }
        }
        fetchOfficers();
    }, [])
    useEffect(() => {
        const fetchData = async () => {
            if (!token) {
                console.log("No token found");
                return;
            }
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
    const filteredOfficers = officers.filter((officer) =>
        officer.fullname.toLowerCase().includes(search.toLowerCase()) ||
        officer.email.toLowerCase().includes(search.toLowerCase()) ||
        officer.department.toLowerCase().includes(search.toLowerCase())
    );
    const sortedIssues = [...issues].sort((a, b) => {
        if (a.issuetype === "Urgent Issue" && b.issuetype !== "Urgent Issue") return -1;
        if (a.issuetype !== "Urgent Issue" && b.issuetype === "Urgent Issue") return 1;
        return 0;
    });
    return (
        <div className='admin-container'>
            <div className="admin-title">Welcome To Admin Department</div>
            <div className="admin-top-bar">
                <input type='text' className="admin-search-input" placeholder='Search Officer By Name' value={search} onChange={(e) => setSearch(e.target.value)} />
                <Link to="/create-officer">
                    <button className="add-admin-btn">+ Add Officer</button>
                </Link>
            </div>
            <div className="admin-table-container">
                <table className="admin-table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Gender</th>
                            <th>Email</th>
                            <th>Department</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredOfficers.map((officer, index) => (
                            <tr key={index}>
                                <td>{officer.fullname}</td>
                                <td>{officer.select}</td>
                                <td>{officer.email}</td>
                                <td>{officer.department}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className='admin-complaint-container'>
                {issues.length === 0 ? (
                    <p className="admin-no-complaint-tag">No Complaints Found</p>
                ) : (
                    <div className="admin-grid-container">
                        {sortedIssues.map((item) => (
                            <div key={item._id} className="admin-complaint-card">
                                <img src={item.image} alt="issue" className="admin-complaint-image" />
                                <div className="admin-complaint-content">
                                    <h3 className="title-admin-complaint">{item.subject}</h3>
                                    <p className="admin-details"><strong>Type: </strong>{item.issuetype}</p>
                                    <p className="admin-details"><strong>Department: </strong>{item.department}</p>
                                    <p className="admin-details"><strong>Location: </strong>{item.location}</p>
                                    <p className="admin-desc"><strong>Description: </strong>{item.description}</p>
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
        </div>
    )
}
export default AdminPage;