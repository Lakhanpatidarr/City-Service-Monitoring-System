import react, { useEffect, useState } from "react";
import '../css/Home.css'
import RajwadaImg from '../assets/Rajwada New Image.avif'
import CleanestImg from '../assets/Cleanest City Image.jpeg'
import CommercialImg from '../assets/Commercial Place Indore.jpg'
import { Link } from "react-router-dom";
import New from '../assets/New.avif'
import NewRajwada from '../assets/Indore New Rajwada.jpeg'
import PoliceDepartment from '../assets/Police Department Indore.avif'
import NagarNigamIndore from '../assets/Nagar Nigam.png'
import FireDepartment from '../assets/Fire Department Indore.jpg'
import Hospital from '../assets/Hospital.jpg'
import Chappan from '../assets/Chappan.jpeg'
import Khajrana from '../assets/khajrana.avif'
import { getTopThreeAPI } from "../services/apiCalls";
import Logo from '../assets/Indore Logo.png';

const Home = () => {
    const [topRatings,setTopRatings] = useState([]);
    useEffect( ()=> {
        async function fetchTopRatings () {
            try {
                const response = await getTopThreeAPI();
                setTopRatings(response?.data?.data || []);
            }
            catch(err) {
                console.log(err);
            }
        }
        fetchTopRatings();
    },[])
    return (
        <div>
            <div className="img_slider">
                <figure>
                    <div className="my_slide">
                        <img src={NewRajwada} alt="Rajwada" />
                        <div className="image-text">Your Voice. Your City. Your Service Platform.</div>
                    </div>
                    <div className="my_slide">
                        <img src={New} alt="Metro" />
                    </div>
                    <div className="my_slide">
                        <img src={Khajrana} alt="Khajrana" />
                    </div>
                    <div className="my_slide">
                        <img src={CommercialImg} alt="Commercial" />
                    </div>
                </figure>
            </div>
            <div className="home-about-indore">
                <h2>About Indore</h2>
                <div className="img-container">
                    <div>
                        <img src={CleanestImg} className="image-first" />
                        <h3>Cleanest City</h3>
                        <p>Indore has been ranked the cleanest city in India for eight consecutive times.</p>
                    </div>
                    <div>
                        <img src={New} className="image-second" />
                        <h3>Metropolian City</h3>
                        <p>Indore is developing its metropolitan network and connecting the city.</p>
                    </div>
                    <div>
                        <img src={CommercialImg} className="image-third" />
                        <h3>Commercial Hub</h3>
                        <p>Indore is the commercial hub of Madhya Pradesh. It has an IT sector, business parks, etc.</p>
                    </div>
                </div>
                <Link to="/aboutcity" className="btn-home">See More →</Link>
                <div className="home-margin">
                    <div>
                        <h2>Ratings</h2>
                        <p>Our project includes an intelligent rating system that calculates the overall rating based on multiple factors such as user ratings, feedback, and our model’s algorithm. The model analyzes user feedback, evaluates the time taken to resolve issues, and combines these insights to generate a fair and accurate overall rating.</p>
                    </div>
                    <div className="Indore-city-heading">Indore City 8/10</div>
                    <div className="rating-box-main-container">
                        <div className="rating-box-home">
                            <h3>Top 3 Zone Ratings</h3>
                            <div>
                                {
                                    !topRatings || topRatings.length === 0 ? (<p>No Rating Added Yet.</p>) : (<table>
                                        <thead>
                                            <tr>
                                                <th>Zone Name</th>
                                                <th>Rating</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                topRatings.map((item, index) => (
                                                    <tr key={index}>
                                                        <td>{item?._id}</td>
                                                        <td>{item?.avgRating}</td>
                                                    </tr>
                                                ))
                                            }
                                        </tbody>
                                    </table>)
                                }
                            </div>
                        </div>
                    </div>
                    <Link to="/viewrating" className="btn-home mt-10">See More →</Link>
                </div>
                <div className="issues-conatiner">
                    <div className="first-issues">
                        <p>📝Total Issues Registered 1500+</p>
                    </div>
                    <div className="second-issues">
                        <p>⏳Total Panding Issues 500</p>
                    </div>
                    <div className="third-issues">
                        <p>✔️Total Resolved Issues 1000+</p>
                    </div>
                </div>
                <div className="home-issue-button-main-container">
                    <div>
                        <h2 className="section-title">Report Issue</h2>
                        <div className="report-box">
                            <div className="issue-header">
                                <strong>Personal Issue</strong>
                                <Link to="/registerissue" className="issue-btn">Click Here</Link>
                            </div>
                            <p className="text">Cleanliness, Police Complaint, Etc.</p>
                        </div>
                        <div className="report-box">
                            <div className="issue-header">
                                <strong>Public Issue</strong>
                                <Link to="/registerissue" className="issue-btn">Click Here</Link>
                            </div>
                            <p className="text">Fire, Path Hole, Street Light, Traffic Light, Etc.</p>
                        </div>
                        <div className="report-box">
                            <div className="issue-header">
                                <strong>Urgent Issue</strong>
                                <Link to="/registerissue" className="issue-btn">Click Here</Link>
                            </div>
                            <p className="text">Fire In Public Area, Health Support, Urgent Police Case, Etc.</p>
                        </div>
                    </div>
                    <div>
                        <h2 className="section-title">Recent Public Alerts</h2>
                        <div className="alert-box">
                            <p>Street Light Not Working</p>
                            <p className="alert-meta">Vijay Nagar • 10 min ago • <span className="status-pending">Pending</span></p>
                        </div>
                        <div className="alert-box">
                            <p>Garbage Not Collected</p>
                             <p className="alert-meta">Rajwada • 50 min ago • <span className="status-accepted">Accepted</span></p>
                        </div>
                        <div className="alert-box">
                            <p>Fire Incident Reported</p>
                            <p className="alert-meta">Palasia • Yesterday • <span className="status-resolved">Resolved</span></p>
                        </div>
                    </div>
                </div>
                <div className="home-margin">
                    <h2>Departments</h2>
                    <div className="home-image-container">
                        <div className="first-home-container">
                            <img src={PoliceDepartment} className="first-home"/>
                            <p>Police Department</p>
                        </div>
                        <div className="second-home-container">
                            <img src={NagarNigamIndore} className="second-home"/>
                            <p>Municipal Department</p>
                        </div>
                        <div className="third-home-container">
                            <img src={FireDepartment} className="third-home"/>
                            <p>Fire Department</p>
                        </div>
                        <div className="four-home-container">
                            <img src={Hospital} className="four-home"/>
                            <p>Health Department</p>
                        </div>
                        <div className="five-home-container">
                            <img src={RajwadaImg} className="five-home"/>
                            <p>Tourism Department</p>
                        </div>
                        <div className="six-home-container">
                            <img src={New} className="six-home"/>
                            <p>Infrastructure Department</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Home;