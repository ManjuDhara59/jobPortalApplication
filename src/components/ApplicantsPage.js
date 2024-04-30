import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useLocation, useParams } from 'react-router-dom';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Button, Container, TablePagination, Typography } from '@mui/material';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import FileDownloadOffRoundedIcon from '@mui/icons-material/FileDownloadOffRounded';
import '../css/ApplicantsPage.css';




const ApplicantsPage = () => {
  const [applicants, setApplicants] = useState([]);
  const [underReviewClicked, setUnderReviewClicked] = useState(false);
  const [shortlistedClicked, setShortlistedClicked] = useState(false);
  const [acceptedClicked, setAcceptedClicked] = useState(false);
  const location = useLocation();
  const { jobId, userId } = useParams();
  const [resumeMaxLimit, setResumeMaxLimit] = useState(true);
  const [resumeMaxLimitError, setResumeMaxLimitError] = useState('');

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  useEffect(() => {
    console.log('applicants');

    const fetchData = async () => {
      try {
        let apiUrl = `http://localhost:8080/jobapplication/getApplicantsList/${jobId}`;

        const response = await axios.get(apiUrl);
        setApplicants(response.data);
      } catch (error) {
        console.error('Error fetching job data:', error);
      }
    };

    fetchData();
  }, [location.pathname]);

  const handleStatusChange = async (applicantId, newStatus) => {
    console.log(applicantId, newStatus);
    try {
      const requestData = {
        applicationstatus: newStatus,
        rejected: newStatus === 'rejected', 
      };

      const response = await axios.put(`http://localhost:8080/jobapplication/updateStatus/${applicantId}`, requestData);

      
      console.log('Applicant status updated:', response.data);

      
    } catch (error) {
      console.error('Error updating applicant status:', error);
    }
  };


  const handleDownloadResume =  (applicantId, jobId, fullname) => {

    const handleResumeLimit = async()=>{

      try {
        const response = await axios.get(`http://localhost:8080/employer/getResumeDownloadEligibility/${userId}`);
        console.log(typeof response.data,response.data);
        setResumeMaxLimit(response.data);
        console.log(resumeMaxLimit);
        if (response.data){
          fetchResume();
          setResumeMaxLimitError('');

        } else {
          setResumeMaxLimitError('Upgrade your plan to download resumes beyond the limit');
        }
        
      } catch (error){
        console.error('Error fetching post limit:', error);
      }
    };

    const fetchResume= async ()=> {
    try {
      const aid = parseInt(applicantId);
      const jid = parseInt(jobId);
      console.log(aid, jid, fullname)
      let apiUrl = `http://localhost:8080/jobapplication/file/${aid}`;
      const response = await axios.get(apiUrl, { responseType: 'blob' });
      const blob = new Blob([response.data], { type: 'application/pdf' }); 
      const url = window.URL.createObjectURL(blob);
      console.log(url)
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `${fullname}`); 
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error('Error fetching resume:', error);
    };
  }


  handleResumeLimit();
  };

  return (

    <Container maxWidth='xl'  sx={{display:'flex',flexDirection:'column', bgcolor:'#575794',minHeight:'100vh',}}>
      <Typography variant='h4' sx={{p:1,m:2,color:'#b6c5e4',fontWeight:'bold'}}>Applicants List</Typography>
      <TableContainer sx={{ maxHeight: 440 ,flex:1}} >
        <Table stickyHeader aria-label="sticky table" sx={{bgcolor:'#d0d0f5'}}>
        <TableHead >
          <TableRow >
            
            <TableCell align="left" sx={{bgcolor:'#8A8AB7',fontWeight:'bold',color:'#262222' }}>Full Name</TableCell>
            <TableCell align="left" sx={{bgcolor:'#8A8AB7',fontWeight:'bold',color:'#262222' }}>Email</TableCell>
            <TableCell align="left" sx={{bgcolor:'#8A8AB7',fontWeight:'bold',color:'#262222' }}>Phone Number</TableCell>
            <TableCell align="left" sx={{bgcolor:'#8A8AB7',fontWeight:'bold',color:'#262222'}}>Application Status</TableCell>
            <TableCell align="left" sx={{bgcolor:'#8A8AB7',fontWeight:'bold',color:'#262222'}}>Resume</TableCell>
            <TableCell align="left" sx={{bgcolor:'#8A8AB7',fontWeight:'bold',color:'#262222'}}>Actions</TableCell>
            <TableCell align="left" sx={{bgcolor:'#8A8AB7',fontWeight:'bold',color:'#262222'}}>Reject</TableCell>
          </TableRow>
        </TableHead>

          <TableBody>
            {applicants
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((applicant) => {
                return (
                  <TableRow key={applicant.applicationId}>
                  <TableCell align="left" sx={{fontWeight:'bold',color:'#333333'}}>{applicant.fullName}</TableCell>
                  <TableCell align="left" sx={{fontWeight:'bold',color:'#333333'}}>{applicant.email}</TableCell>
                  <TableCell align="left" sx={{fontWeight:'bold',color:'#333333'}}>{applicant.phoneNumber}</TableCell>
                  <TableCell align="left" sx={{fontWeight:'bold',color:'#333333'}}>{applicant.applicationStatus}</TableCell>
                  <TableCell align="left"><Button sx={{color:'#6865ff',":hover":{bgcolor:'#6865ff',color:'white'}}} onClick={() => handleDownloadResume(applicant.applicationId, jobId, applicant.fullName)}>{ resumeMaxLimit ?  <CloudDownloadIcon />: <FileDownloadOffRoundedIcon/>}</Button></TableCell>
                  <TableCell align="left" >

                  {applicant.applicationStatus !== 'rejected' && (
                    <>
                  {!['shortlisted', 'accepted', 'under review'].includes(applicant.applicationStatus) && (
                  <Button size='small' variant='contained' sx={{bgcolor:'#6865ff', color:'white',":hover":{bgcolor:'#3936ea'},fontFamily:'cursive',fontWeight:'bold'}} onClick={() => handleStatusChange(applicant.applicationId, 'under review')}>Under Review</Button>
                )}
                {!['shortlisted', 'accepted', 'submitted'].includes(applicant.applicationStatus) && (<Button size='small' variant='contained' sx={{bgcolor:'#6865ff', color:'white',":hover":{bgcolor:'#3936ea'},fontFamily:'cursive',fontWeight:'bold'}} onClick={() => handleStatusChange(applicant.applicationId, 'shortlisted')}>Shortlist</Button>)}
                {!['under review', 'accepted', 'submitted'].includes(applicant.applicationStatus) && (<Button size='small' variant='contained' sx={{bgcolor:'#6865ff', color:'white',":hover":{bgcolor:'#3936ea'},fontFamily:'cursive',fontWeight:'bold'}} onClick={() => handleStatusChange(applicant.applicationId, 'accepted')}>Accept</Button>)}
                     </>
            )}
                    </TableCell>
                  <TableCell align="left">
                   <Button size='small' variant='contained' sx={{bgcolor:'#6865ff', color:'white',":hover":{bgcolor:'#3936ea'},":disabled":{ color:'#6865ff'} ,fontFamily:'cursive',fontWeight:'bold'}}  disabled={applicant.applicationStatus === 'accepted' || applicant.applicationStatus === 'rejected'} onClick={() => handleStatusChange(applicant.applicationId, 'rejected')}>Reject</Button>
                  </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        sx={{fontWeight:'bold'}}
        rowsPerPageOptions={[1, 10, 50]}
        count={applicants.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        
      />
   </Container>
    // <div>
    //   {applicants.length===0 && <span>No one has applied for job yet!!</span>}
    //   { resumeMaxLimitError && (<span>{resumeMaxLimitError}</span>)}
    //   <h1>Applicants</h1>
    //   {applicants.map((applicant) => (
    //     <div key={applicant.applicationId} className="applicant-card">
    //       <h3>{applicant.fullName}</h3>
    //       <p>Email: {applicant.email}</p>
    //       <p>Phone: {applicant.phoneNumber}</p>
    //       <p>Status: {applicant.applicationStatus}</p>
    //       <button onClick={() => handleDownloadResume(applicant.applicationId, jobId, applicant.fullName)}>Download Resume</button>
    //       <div>
            // {applicant.applicationStatus !== 'rejected' && (
            //   <>
                // {!['shortlisted', 'accepted', 'under review'].includes(applicant.applicationStatus) && (
                //   <button onClick={() => handleStatusChange(applicant.applicationId, 'under review')}>Under Review</button>
                // )}
                // {!['shortlisted', 'accepted', 'Submitted'].includes(applicant.applicationStatus) && (<button onClick={() => handleStatusChange(applicant.applicationId, 'shortlisted')}>Shortlisted</button>)}
                // {!['under review', 'accepted', 'Submitted'].includes(applicant.applicationStatus) && (<button onClick={() => handleStatusChange(applicant.applicationId, 'accepted')}>Accepted</button>)}
                // {(applicant.applicationStatus !== 'accepted' && applicant.applicationStatus !== 'rejected') && (<button onClick={() => handleStatusChange(applicant.applicationId, 'rejected')}>Rejected</button>)}
    //           </>
    //         )}

    //       </div>
    //     </div>
    //   ))}
    // </div>
  );
};

export default ApplicantsPage;
