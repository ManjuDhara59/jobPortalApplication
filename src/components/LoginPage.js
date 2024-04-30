import React from 'react';
import { Link } from 'react-router-dom';
import '../css/LoginPage.css'; 
import { FaBriefcase, FaUserTie, FaUserShield } from 'react-icons/fa'; 

const LoginPage = ({handleLoginClick}) => {
    
    return (
        <div className="login-page" style={{background:'#f1f1ff'}}>
            <div className="content-container">
                <h1>Welcome to Your Job Portal</h1>
                <p>Choose your role to get started:</p>
            </div>
            <div className="card-container">
               
                <div className="card employer-card">
                    <div className="icon-container">
                        <FaBriefcase className="icon" />
                    </div>
                    <h2>Employer</h2>
                    <p>Login or Signup as an employer to post job openings.</p>
                    <Link to="/login-form" className="login-button" onClick={() => handleLoginClick('employer')}>Login</Link>
                    <Link to="/signup-form-employer" className="signup-button" onClick={() => handleLoginClick('employer')}>Signup</Link>
                </div>

                
                <div className="card job-seeker-card">
                    <div className="icon-container">
                        <FaUserTie className="icon" />
                    </div>
                    <h2>Job Seeker</h2>
                    <p>Login or Signup as a job seeker to search for job openings.</p>
                    <Link to="/login-form" className="login-button" onClick={() => handleLoginClick('job seeker')}>Login</Link>
                    <Link to="/signup-form" className="signup-button" onClick={() => handleLoginClick('job seeker')}>Signup</Link>
                </div>

               
                <div className="card admin-card">
                    <div className="icon-container">
                        <FaUserShield className="icon" />
                    </div>
                    <h2>Admin</h2>
                    <p>Login as an admin to manage job listings and user accounts.</p>
                    <Link to="/login-form" className="admin-login-button" onClick={() => handleLoginClick('admin')}>Login</Link>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
