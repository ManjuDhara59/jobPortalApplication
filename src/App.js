import React, { useState, useEffect } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Route, Routes, useNavigate, Link } from 'react-router-dom';
import SearchBar from './components/SearchBar';
import JobPostings from './components/JobPostings';
import JobDetails from './components/JobDetails';
import LoginPage from './components/LoginPage';
import LoginForm from './components/LoginForm';
import SignUpForm from './components/SignUpForm';
import usersData from './users.json';
import SignUpFormEmp from './components/SignUpFormEmp';
import TrackingStatus from './components/TrackingStatus';
import JobPostForm from './components/JobPostForm';
import JobApplicationForm from './components/JobApplicationForm';
import Onboarding from './components/OnBoarding';
import SubscriptionPlans from './components/SubscriptionPlans';
import ApplicantsPage from './components/ApplicantsPage';
import SubscriptionPlanEditForm from './components/SubscriptionPlanEditForm';
import PasswordResetForm from './components/PasswordResetForm';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PlanCard from './components/PlanCard';
import EmployerSignUpSubmit from './components/EmployerSignUpSubmit';

function App() {

  const [loggedIn, setLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState('');
  const [error, setError] = useState('');
  const [userRole, setUserRole] = useState('');
  const [userId, setUserId] = useState('');
  const [searchBarData, setSearchBarData] = useState([]);
  const [applied, setApplied] = useState(true);
  const [page,setPage] = useState('home');
  const [employerDetails, setEmployerDetails] = useState({});


  const handleLogin = (credentials,uid, navigate) => {
    const { username, password} = credentials;
    
    if (username){
      console.log('app js ',username);

    }
   
    if (username) {
      setLoggedIn(true);
      setCurrentUser(username);
      setUserId(uid);
      setError('');
      console.log(typeof userId);
      navigate(`/${userId}`);

      toast.error('Successfully logged in', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
        
    } else {
      setError('Invalid username or password');
    }
  };

  const handleEmployerNext = (empDetails,navigate) =>{
    setEmployerDetails(empDetails);
    navigate('/employer-signup-submit');
  }

  
  const handleSignUpData = (userInfo, navigate) => {
    console.log(userInfo);
    setUserRole(userInfo.userroles);
    navigate(`/${userId}`);
  };

  const handleApplied = (userInfo,uid,jid, navigate) => {
    console.log(userInfo);
    setApplied(userInfo);
    navigate(`/${uid}/job/${jid}`);
  };

  const handleLoginClick = (role) => {
    setUserRole(role);
    console.log(role,userRole);
  }

  const handleSearchClick = (searchData) => {
    setSearchBarData(searchData)
    console.log(searchData.typedValue,searchData.salary);
  } 

  const handlePageRender = (value) =>{
    setPage(value);
  }

  const handleLogout = ()=>{
    setUserId('');
    setCurrentUser('');
    setUserRole('');
  }

  return (
    <Router>
      <div className="App">
        <Navbar currentUser={currentUser} userId={userId} userRole={userRole} handlePageRender={handlePageRender} handleLogout={handleLogout}/>
        <Routes>
          <Route path="/" element={<>
            <SearchBar handleSearchClick={handleSearchClick} userRole={userRole} searchBarData={searchBarData}/>
            <JobPostings searchBarData={searchBarData}  />
          </>} />
        <Route path="/" element={<>
            <SearchBar handleSearchClick={handleSearchClick} userRole={userRole} searchBarData={searchBarData}/>
            <JobPostings searchBarData={searchBarData} />
          </>} />
          <Route path="/:userId" element={
            <>
              <SearchBar handleSearchClick={handleSearchClick} userRole={userRole} searchBarData={searchBarData}/>
             
              <JobPostings searchBarData={searchBarData} />
            </>
          } />
          <Route path="/posted-jobs/:userId" element={<>
            <SearchBar handleSearchClick={handleSearchClick} userRole={userRole} searchBarData={searchBarData}/>
            <JobPostings searchBarData={searchBarData}/>
          </>} />

          <Route path="/:userId/appliedjobs" element={<>
            <SearchBar handleSearchClick={handleSearchClick} userRole={userRole} searchBarData={searchBarData}/>
            <JobPostings searchBarData={searchBarData}/>
          </>} />
          <Route path="/:userId/job/:jobId" element={<JobDetails userRole={userRole} applied={applied} page={page}/>} />
          
          <Route path="/login" element={<LoginPage loggedIn={loggedIn} currentUser={currentUser} handleLoginClick={handleLoginClick} />} />
         
          <Route path="/login-form" element={<LoginForm handleLogin={handleLogin} error={error} userRole={userRole} />} />
         
          <Route path="/signup-form" element={<SignUpForm handleSignUpData={handleSignUpData}/>} />
          <Route path="/signup-form-employer" element={<SignUpFormEmp handleSignUpData={handleSignUpData} handleEmployerNext={handleEmployerNext}/>} />
          <Route path="/subscription-plans" element={<SubscriptionPlans userRole={userRole}/>} />
          <Route path="/onboard-employers" element={<Onboarding />} />
          <Route path="/:userId/job-post-form" element={<JobPostForm />} />
          <Route path="/:userId/job-post-form/:jobId" element={<JobPostForm />} />
          <Route path="/:userId/job-application-form/:jobId" element={<JobApplicationForm handleApplied={handleApplied}/>} />
          <Route path="/:userId/tracking-status/:jobId" element={<TrackingStatus />} />
          <Route path="/:userId/applicants/:jobId" element={<ApplicantsPage />} />
          <Route path="/edit-plan/:planId" element={<SubscriptionPlanEditForm />} />
          <Route path="/edit-plan" element={<SubscriptionPlanEditForm />} />
          <Route path="/forgot-password" element={<PasswordResetForm userRole={userRole}/>} />
          <Route path="/employer-signup-submit" element={<EmployerSignUpSubmit  userRole={userRole} employerDetails={employerDetails} />} />
         
        </Routes>
        
      </div>
      <ToastContainer/>
    </Router>
  );
}

export default App;
