import react, { useState } from "react";
import { Link } from "react-router-dom";
import '../css/ReportIssue.css'

const ReportIssue = () =>{
    return (
        <div className="parent-report-container">
            <div className="reportissue-issue-button-main-container">
                    <div>
                        <h2 className="reportsection-title">Report Issue</h2>
                        <div className="reportissue-box">
                            <div className="reportissue-header">
                                <strong>Personal Issue</strong>
                                <Link to="/registerissue" className="reportissue-btn">Click Here</Link>
                            </div>
                            <p className="textreport">Cleanliness, Police Complaint, Etc.</p>
                        </div>
                        <div className="reportissue-box">
                            <div className="reportissue-header">
                                <strong>Public Issue</strong>
                                <Link to="/registerissue" className="reportissue-btn">Click Here</Link>
                            </div>
                            <p className="textreport">Fire, Path Hole, Street Light, Traffic Light, Etc.</p>
                        </div>
                        <div className="reportissue-box">
                            <div className="reportissue-header">
                                <strong>Urgent Issue</strong>
                                <Link to="/registerissue" className="reportissue-btn">Click Here</Link>
                            </div>
                            <p className="textreport">Fire In Public Area, Health Support, Urgent Police Case, Etc.</p>
                        </div>
                    </div>
                    <div>
                        <h2 className="reportsection-title">Recent Public Alerts</h2>
                        <div className="report-alert-box">
                            <p>Street Light Not Working</p>
                            <p class="report-alert-meta">Vijay Nagar • 10 min ago • <span class="report-status-pending">Pending</span></p>
                        </div>
                        <div className="report-alert-box">
                            <p>Garbage Not Collected</p>
                             <p class="report-alert-meta">Rajwada • 50 min ago • <span class="report-status-accepted">Accepted</span></p>
                        </div>
                        <div className="report-alert-box">
                            <p>Fire Incident Reported</p>
                            <p class="report-alert-meta">Palasia • Yesterday • <span class="report-status-resolved">Resolved</span></p>
                        </div>
                    </div>
            </div>
        </div>
    )
}
export default ReportIssue