import React, { useState, useEffect } from 'react';
import { Link, useParams, useLocation } from 'react-router-dom';
import '../css/TrackingStatus.css';
import axios from 'axios';
import { Container } from '@mui/material';


const TrackingStatus = () => {

  

  const { jobId, userId } = useParams();

  const toLowerCaseSafe = str => (typeof str === 'string' ? str.toLowerCase() : '');


  const [job, setJob] = useState({
    title: '',
    company: '',
    location: '',
    salary: '',
    jobtype: '',
    applicationstatus: '',
    applieddate:'',
    rejected: false
});

  const statusFlow = [
    { status: 'Submitted', label: 'Submitted' },
    { status: 'Under Review', label: 'Under Review' },
    { status: 'Shortlisted', label: 'Shortlisted' },
    { status: 'Accepted', label: 'Accepted' }
  ];

  useEffect(() => {
    console.log('Tracking status useeffect');

    const fetchData = async () => {
      try {
        let apiUrl = `http://localhost:8080/job/getJobDetailsById/${jobId}`;

        const response = await axios.get(apiUrl);
        const { title, employer, location, jobtype, salary } = response.data; 
        const company = employer ? employer.empname : '';
        setJob(prevJob => ({
          ...prevJob,
          title: title,
          company: company,
          location: location,
          salary : salary,
          jobtype : jobtype
      }));
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching job data:', error);
      }
    };

    const fetchApplicationStatus = async () => {
      try {
        const applicationResponse = await axios.get(`http://localhost:8080/jobapplication/${userId}/getJobApplicationStatus/${jobId}`);
        console.log(applicationResponse.data)
        const { applicationstatus, rejected,applieddate } = applicationResponse.data;
        setJob(prevJob => ({
            ...prevJob,
            applicationstatus: applicationstatus,
            applieddate: applieddate,
            rejected: rejected
        }));
      } catch (error) {
        console.error('Error fetching application status:', error);
      }
    };
    fetchApplicationStatus();
    fetchData();
  }, []);



  const renderStatusFlow = () => {
    const currentIndex = statusFlow.findIndex(item => toLowerCaseSafe(item.status) === job.applicationstatus);
    return statusFlow.map((flowItem, index) => {
      const isActive = index === currentIndex;
      const isRejected = job.rejected || (currentIndex !== -1 && index > currentIndex);
      const hasNext = index < statusFlow.length - 1;

      return (
        <div key={index} className={`status-item ${isActive ? 'active' : ''} ${isRejected ? 'rejected' : ''}`}>
          <div className={`status-dot ${isActive ? 'active' : ''} ${isRejected ? 'rejected' : ''}`}></div>
          <div className={`status-label ${isActive ? 'active' : ''} ${isRejected ? 'rejected' : ''}`}>{flowItem.label}</div>
          {hasNext && <div className={`arrow ${isActive ? 'active' : ''}`}>&rarr;</div>}
        </div>
      );
    });
  };

  return (
    <Container maxWidth='xl' sx={{bgcolor:'#9999ce',minHeight:'100vh',pt:3,pb:1}}>
    <div className="job-status-container">
      <header>
        <h1>Job Status Tracker</h1>
      </header>
      <div className="content">
        <div className="job-details">
          <h2>{job.title}</h2>
          <p>Company: {job.company}</p>
          <p>Location: {job.location}</p>
          <p>Job Type: {job.jobtype}</p>
          <p>Salary: {job.salary}</p>
          <p>Applied Date: {job.applieddate}</p>
        </div>
        {job.rejected ? (
            <h2 className="rejected-status">Your Application has been Rejected</h2>
          ) : (
        <div className="status-flow">
           {renderStatusFlow()}
          
        </div>)}
      </div>
      <footer>
        <p>© 2024 Job Status Tracker</p>
      </footer>
    </div>
    </Container>
  );
};


export default TrackingStatus;
