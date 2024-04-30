import React, { useState, useEffect } from 'react';
import jobPostingsData from '../jobPostingsData.json';
import { Link, useParams, useLocation, useNavigate } from 'react-router-dom'; 
import axios from 'axios';
import { Divider, Grid, List, ListItem, ListItemContent, ListItemDecorator } from '@mui/joy';
import { Button, Card, Typography } from '@mui/material';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

const JobDetails = ({ userRole, page }) => {
    const { jobId, userId } = useParams();

    const [job, setJob] = useState([]);
    const navigate = useNavigate();

    const [applicationStatus, setApplicationStatus] = useState(null);
    const [rejected, setRejected] = useState(false);
    const [homepage, setHomepage] = useState('');
    const location = useLocation();



    useEffect(() => {
        console.log('job postings useeffect userrole',userRole);

        const fetchData = async () => {
            try {
                let apiUrl = `http://localhost:8080/job/getJobDetailsById/${jobId}`;

                const response = await axios.get(apiUrl);
                setJob(response.data);
            
            } catch (error) {
                console.error('Error fetching job data:', error);
            }
        };


        const fetchApplicationStatus = async () => {
            try {
                const applicationResponse = await axios.get(`http://localhost:8080/jobapplication/${userId}/getJobApplicationStatus/${jobId}`);
                
                setApplicationStatus(applicationResponse.data.applicationstatus);
                setRejected(applicationResponse.data.rejected);
            } catch (error) {
                console.error('Error fetching application status:', error);
            }
        };

        fetchData();
        console.log(page);
        if (userRole === 'job seeker' && userId) {
            fetchApplicationStatus();
        }



    }, []);


    const handleEdit = (uid, jid) => {
        navigate(`/${uid}/job-post-form/${jid}`);
    }

    const handleDelete = async (uid, jid) => {
        const response = await axios.delete(`http://localhost:8080/job/deleteJob/${jid}`);
        console.log('Job Deleted:', response);
        navigate(`/posted-jobs/${uid}`);
    }

    return (
        <Grid container spacing={1} direction='row' justifyContent='center' disableEqualOverflow={true} sx={{bgcolor:'#f1f1ff',p:2}} >

            <Grid container item rowSpacing={2} columnSpacing={2} md={7} direction='column'  sx={{ mt: 2, ml: 2 }} >


                <Grid item xs={12}  >
                    <Card elevation={10} sx={{bgcolor: '#8a8ac9'}}>
                        <Typography variant='h4' sx={{ textAlign: 'left',color:'#2f2d2d',fontWeight:'bold', px: 2, py: 1 }}>{job.title}</Typography>
                    </Card>
                </Grid>

                <Grid item xs={12} >
                    <Card elevation={10} sx={{bgcolor: '#8a8ac9'}}>
                        <Typography variant='h6' sx={{ textAlign: 'left',fontWeight:'bold',color:'#2f2d2d', px: 2, py: 1 }}>Job Description</Typography>
                        <Divider orientation='horizontal' sx={{ mx: 1, bgcolor: 'black' }} />
                        <Typography  sx={{ textAlign: 'left',fontWeight:'bold',color:'#333333', px: 2, py: 1 }}>
                            {job.description}
                        </Typography>
                    </Card>
                </Grid>

                <Grid item xs={12} >
                    <Card elevation={10} sx={{bgcolor: '#8a8ac9'}}>



                        <Typography variant='h6' sx={{ textAlign: 'left',color:'#2f2d2d',fontWeight:'bold', px: 2, py: 1 }}>Benefits</Typography>
                        <Divider orientation='horizontal' sx={{ mx: 1, bgcolor: 'black' }} />

                        {job && job.benefits && job.benefits.map((benefit, index) => (
                            <List marker='disc' key={index} >
                                <ListItem variant='plain' sx={{ textAlign: 'left' }}>
                                    <Typography variant='body1'sx={{fontWeight:'bold',color:'#333333'}} >{benefit}</Typography>
                                </ListItem>
                            </List>

                        ))}

                    </Card>
                </Grid>

                <Grid item xs={12} >
                    <Card elevation={10} sx={{bgcolor: '#8a8ac9'}}>
                        <Typography variant='h6' sx={{ textAlign: 'left',fontWeight:'bold',color:'#2f2d2d', px: 2, py: 1 }}>Education</Typography>
                        <Divider orientation='horizontal' sx={{ mx: 1, bgcolor: 'black' }} />
                        <Typography variant='body1' sx={{ textAlign: 'left', px: 2, py: 1,fontWeight:'bold',color:'#333333' }}> {job.education}</Typography>
                    </Card>
                </Grid>

                <Grid item xs={12} >
                    <Card elevation={10} sx={{bgcolor: '#8a8ac9'}}>
                        <Typography variant='h6' sx={{ textAlign: 'left',fontWeight:'bold',color:'#2f2d2d', px: 2, py: 1 }}>About {job.employer && job.employer.empname}</Typography>
                        <Divider orientation='horizontal' sx={{ mx: 1, bgcolor: 'black' }} />
                        <Typography variant='body1' sx={{ textAlign: 'left', px: 2, py: 1,fontWeight:'bold',color:'#333333' }}>{job.employer && job.aboutthecompany}</Typography>
                    </Card>
                </Grid>
            </Grid>

            <Grid container item rowSpacing={3} columnSpacing={2} md={4} direction='column' sx={{ mt: 2, ml: 2 }}>

                <Grid item xs={12}  >
                    <Card elevation={10} sx={{bgcolor: '#8a8ac9'}}>
                        <Typography variant='h6' sx={{ textAlign: 'left', px: 2, py: 1,fontWeight:'bold',color:'#2f2d2d' }}>Job Summary</Typography>
                        <Divider orientation='horizontal' sx={{ mx: 1, bgcolor: 'black' }} />

                        <List marker='disc' >
                            <ListItem variant='plain' sx={{ textAlign: 'left' }}>
                                <Typography variant='body1' sx={{fontWeight:'bold',color:'#333333'}} >Posted Date: {job.posteddate}</Typography>
                            </ListItem>
                            <ListItem variant='plain' sx={{ textAlign: 'left' }}>
                                <Typography variant='body1' sx={{fontWeight:'bold',color:'#333333'}}>Location: {job.location}</Typography>
                            </ListItem>
                            <ListItem variant='plain' sx={{ textAlign: 'left' }}>
                                <Typography variant='body1' sx={{fontWeight:'bold',color:'#333333'}}>Salary: {job.salary}</Typography>
                            </ListItem>
                            <ListItem variant='plain' sx={{ textAlign: 'left' }}>
                                <Typography variant='body1' sx={{fontWeight:'bold',color:'#333333'}}>Openings: {job.vacancy}</Typography>
                            </ListItem>
                            <ListItem variant='plain' sx={{ textAlign: 'left' }}>
                                <Typography variant='body1' sx={{fontWeight:'bold',color:'#333333'}}>Job Type: {job.jobtype}</Typography>
                            </ListItem>
                            <ListItem variant='plain' sx={{ textAlign: 'left' }}>
                                <Typography variant='body1' sx={{fontWeight:'bold',color:'#333333'}}>Application Deadline: {job.deadline}</Typography>
                            </ListItem>
                            <ListItem variant='plain' sx={{ textAlign: 'left' }}>
                                <Typography variant='body1' sx={{fontWeight:'bold',color:'#333333'}}> Skills: </Typography>
                                <List marker='circle' >
                                {job && job.skills && job.skills.map((skill, index) => (
                                    <ListItem key={index} variant='plain' sx={{ textAlign: 'left' }}>
                                        <Typography variant='body1' sx={{fontWeight:'bold',color:'#333333'}}>{skill}</Typography>
                                    </ListItem>
                                ))}
                                </List>
                            </ListItem>




                        </List>
                    </Card>
                </Grid>

                <Grid item xs={12} >
                    <Card elevation={10} sx={{bgcolor: '#8a8ac9'}}>
                        <Typography variant='h6' sx={{ textAlign: 'left', px: 2, py: 1,fontWeight:'bold',color:'#2f2d2d' }}>Contact Info</Typography>
                        <Divider orientation='horizontal' sx={{ mx: 1, bgcolor: 'black' }} />
                        <Typography variant='body1' sx={{ textAlign: 'left', px: 2, py: 1,fontWeight:'bold',color:'#333333' }}>Name: {job.employer && job.employer.fullname}</Typography>
                        <Typography variant='body1' sx={{ textAlign: 'left', px: 2, py: 1,fontWeight:'bold',color:'#333333' }}>Phone: {job.employer && job.employer.phone}</Typography>
                        <Typography variant='body1' sx={{ textAlign: 'left', px: 2, py: 1,fontWeight:'bold',color:'#333333' }}>Email: {job.employer && job.employer.email}</Typography>

                    </Card>
                </Grid>
            </Grid>


            { userRole === 'employer' && page!== 'home' && (
                <Grid item xs={4} md={5}  >
                    <Button variant='contained' sx={{bgcolor:'#6865ff', color:'white',":hover":{bgcolor:'#3936ea'},fontFamily:'cursive',fontWeight:'bold'}} onClick={() => handleEdit(userId, jobId)}>Edit</Button>
                    <Button variant='outlined' sx={{ mx: 3, my: 2,bgcolor:'#f6f6ff', color:'#6865ff',":hover":{bgcolor:'#d5d5f5'},fontFamily:'cursive',fontWeight:'bold' }} onClick={() => handleDelete(userId, jobId)}>Delete</Button>
                    <Button variant='contained' sx={{bgcolor:'#6865ff',width:130, color:'white',":hover":{bgcolor:'#3936ea'},fontFamily:'cursive',fontWeight:'bold'}} onClick={() => navigate(`/${userId}/applicants/${jobId}`)}>Applicants</Button>
                </Grid>
            )}

            {userRole === 'job seeker' && (
                <Grid item>
                    {!applicationStatus ? (
                        <Button variant='contained' sx={{bgcolor:'#6865ff', color:'white',":hover":{bgcolor:'#3936ea'},fontFamily:'cursive',fontWeight:'bold',mx:3,my:2}} onClick={() => navigate(`/${userId}/job-application-form/${jobId}`)}>Apply</Button>
                    ) : (
                        <>
                            <Button disabled={true} variant='outlined' sx={{ mx: 2, my: 2, color:'#6865ff',fontFamily:'cursive',":disabled":{color:'#6865ff',borderColor:'#6865ff',bgcolor:'lightgrey'}, fontWeight:'bold' }}>Applied</Button>
                            <Button variant='contained' sx={{bgcolor:'#6865ff', color:'white',":hover":{bgcolor:'#3936ea'},fontFamily:'cursive',fontWeight:'bold',mx:2,my:2}} onClick={() => navigate(`/${userId}/tracking-status/${jobId}`)}>Tracking Status</Button>

                        </>
                    )}
                </Grid>
            )}


        </Grid>

      
      

    );
};

export default JobDetails;
