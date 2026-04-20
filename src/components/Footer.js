import { Link } from "react-router-dom";
import '../css/Footer.css';
import { subscribeAPI } from "../services/apiCalls";
import { useState } from "react";
const Footer = () => {
    const [email, setEmail] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [message,setMessage] = useState('');
    async function submitHandler (event) {
            event.preventDefault();
            setIsSubmitted(false);
            if(!email.includes('@') || !email.includes('.')) {
                setMessage('Please enter a valid email address.');
                return;
            }
            try {
                const response = await subscribeAPI(email);
                if(response.data.success) {
                    setIsSubmitted(true);
                    setMessage('Email Submitted Successfully !');
                    setEmail('');
                }
            }
            catch(error) {
                setMessage(error.response?.data?.message || "Error while subscribing. Please try again");
            }
        }
    return (
        <footer className="footer">
            <div className="footer-container">
                <div className="footer-section">
                    <h4>Quick Links</h4>
                    <ul>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/reportissue">Report Issue</Link></li>
                        <li><a href="/all-complaints">Track Complaint</a></li>
                        <li><Link to="/dashboard">Dashboard</Link></li>
                        <li><a href="/faq">FAQs</a></li>
                        <li><a href="/support">Support</a></li>
                        <li><a href="/terms">Terms & Conditions</a></li>
                        <li><a href="/privacy">Privacy Policy</a></li>
                    </ul>
                </div>
                <div className="footer-section">
                    <h4>Contact</h4>
                    <p>Indore Municipal Support Center</p>
                    <p>📍 Indore, Madhya Pradesh</p>
                    <p>📞 Toll-Free: 1800-XXX-XXXX</p>
                    <p>📧 support@indorecityservice.in</p>
                </div>
                <div className="footer-section">
                    <h4>Follow Us</h4>
                    <div className="social-links">
                        <a href="#">LinkedIn</a>
                        <a href="#">Facebook</a>
                        <a href="#">Instagram</a>
                        <a href="#">Twitter</a>
                    </div>
                </div>
                <div className="footer-section stats">
                    <h4>City Stats</h4>
                    <p>📝 Registered Issues: 1500+</p>
                    <p>⏳ Pending: 500</p>
                    <p>✔️ Resolved: 1000+</p>
                </div>
                <div className="footer-section">
                    <h4>Stay Updated</h4>
                    <p>Get latest public alerts, updates & announcements.</p>
                    <div>
                        <form onSubmit={submitHandler}>
                            <div className="newsletter">
                                <input type="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} />
                                <button type="submit">Subscribe</button>
                            </div>
                        </form>
                        {isSubmitted && <p style={{ color: 'green' }}>{message}</p>}
                        {!isSubmitted && message && <p style={{ color: 'red' }}>{message}</p>}
                    </div>
                </div>
            </div>
            <div className="emergency-bar">
                <p>🚨 Emergency Helpline (24×7): 100 | 108 | 1098</p>
            </div>
            <div className="footer-bottom">
                <p>© 2025 Indore City Service Platform — All Rights Reserved.</p>
                <p>Crafted with precision by Lakhan Patidar</p>
            </div>
        </footer>
    );
};

export default Footer;