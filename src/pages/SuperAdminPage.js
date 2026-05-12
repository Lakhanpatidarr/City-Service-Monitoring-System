import { Link } from 'react-router-dom';
import '../css/SuperAdminPage.css'
import { getAllAdminAPI } from '../services/apiCalls';
import { getAllIssuesAPI } from '../services/apiCalls';
import { useEffect, useState } from 'react';
const SuperAdminPage = () => {
    const [admins, setAdmins] = useState([]);
    const [search, setSearch] = useState("");
    const [issues, setIssues] = useState([]);
    const [adminLoading, setAdminLoading] = useState(false);
    const [issueLoading, setIssueLoading] = useState(false);
    const token = localStorage.getItem("token");
    useEffect(() => {
        async function fetchAdmins() {
            setAdminLoading(true);
            try {
                const response = await getAllAdminAPI();
                setAdmins(response.data.data);
            }
            catch (err) {
                console.log(err);
            }
            setAdminLoading(false);
        }
        fetchAdmins();
    }, [])
    useEffect(() => {
        const fetchData = async () => {
            setIssueLoading(true);
            try {
                const res = await getAllIssuesAPI();
                setIssues(res.data.data);
            }
            catch (err) {
                console.log(err.response?.data);
            }
            setIssueLoading(false);
        };
        fetchData();
    }, []);
    const filteredAdmins = admins.filter((admin) =>
        admin.fullname.toLowerCase().includes(search.toLowerCase()) ||
        admin.email.toLowerCase().includes(search.toLowerCase()) ||
        admin.department.toLowerCase().includes(search.toLowerCase())
    );
    const sortedIssues = [...issues].sort((a, b) => {
        if (a.issuetype === "Urgent Issue" && b.issuetype !== "Urgent Issue") return -1;
        if (a.issuetype !== "Urgent Issue" && b.issuetype === "Urgent Issue") return 1;
        return 0;
    });
    if (adminLoading || issueLoading) {
        return (
            <div className="center-spinner">
                <div className="spinner"></div>
            </div>
        )
    }
    return (
        <div className='super-admin-container'>
            <div className="super-admin-title">Welcome To Super Admin Department</div>
            <div className="top-bar">
                <input type='text' className="search-input" placeholder='Search Admin By Name' value={search} onChange={(e) => setSearch(e.target.value)} />
                <Link to="/create-admin">
                    <button className="add-admin-btn">+ Add Admin</button>
                </Link>
                <Link to="/create-officer">
                    <button className="add-officer-btn">+ Add Officer</button>
                </Link>
            </div>
            <div className="table-container">
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
                        {filteredAdmins.map((admin, index) => (
                            <tr key={index}>
                                <td>{admin.fullname}</td>
                                <td>{admin.select}</td>
                                <td>{admin.email}</td>
                                <td>{admin.department}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className='super-admin-complaint-container'>
                {issues.length === 0 ? (
                    <p className="super-admin-no-complaint-tag">No Complaints Found</p>
                ) : (
                    <div className="super-admin-grid-container">
                        {sortedIssues.map((item) => (
                            <div key={item._id} className="super-admin-complaint-card">
                                <img src={item.image} alt="issue" className="super-admin-complaint-image" />
                                <div className="super-admin-complaint-content">
                                    <h3 className="title-super-admin-complaint">{item.subject}</h3>
                                    <p className="super-admin-details"><strong>Type: </strong>{item.issuetype}</p>
                                    <p className="super-admin-details"><strong>Department: </strong>{item.department}</p>
                                    <p className="super-admin-details"><strong>Location: </strong>{item.location}</p>
                                    <p className="super-admin-desc"><strong>Description: </strong>{item.description}</p>
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
export default SuperAdminPage;