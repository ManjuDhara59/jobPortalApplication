import React, { useState, useEffect } from 'react';
import { FaBuilding, FaMoneyBillAlt, FaUserClock, FaInfoCircle } from 'react-icons/fa'; 
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { Box, Button, Card, CardActions, CardContent, Chip, Divider, Typography } from '@mui/joy';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import WorkHistoryIcon from '@mui/icons-material/WorkHistory';
import PendingActionsIcon from '@mui/icons-material/PendingActions';
import { Container } from '@mui/material';



const JobPostings = ({ searchBarData }) => {
  const toLowerCaseSafe = str => (typeof str === 'string' ? str.toLowerCase() : '');


  const [jobPostingsData, setJobPostingsData] = useState([]);
  const location = useLocation();
  const { userId } = useParams();
  const navigate = useNavigate();


  console.log('job-posting', location.pathname);

  useEffect(() => {
    console.log('job postings useeffect');

    const fetchData = async () => {
      try {
        let apiUrl = 'http://localhost:8080/job/getAllJobs';

        if (location.pathname === `/posted-jobs/${userId}` && userId) {
          apiUrl = `http://localhost:8080/job/getPostedJobs/${userId}`;
        }

        else if (location.pathname === `/${userId}/appliedjobs` && userId) {
          apiUrl = `http://localhost:8080/job/getAppliedJobs/${userId}`;
        }

        const response = await axios.get(apiUrl);
        setJobPostingsData(response.data);
      } catch (error) {
        console.error('Error fetching job data:', error);
      }
    };

    fetchData();
  }, [location.pathname]);

  const handleDetailsButton = (jobid) => {
    navigate(`/${userId}/job/${jobid}`);
  }


  const filteredJobPostings = searchBarData ? jobPostingsData.filter(job => {

    
    const typedValueLower = toLowerCaseSafe(searchBarData?.typedValue);

    return (
      (!typedValueLower ||
        toLowerCaseSafe(job.title).includes(typedValueLower) ||
        toLowerCaseSafe(job.location).includes(typedValueLower) ||
        toLowerCaseSafe(job.description).includes(typedValueLower) ||
        toLowerCaseSafe(job.jobtype).includes(typedValueLower) ||
        toLowerCaseSafe(job.experience).includes(typedValueLower) ||
        job.skills.some(skill => toLowerCaseSafe(skill).includes(typedValueLower)) ||
        toLowerCaseSafe(job.salary).includes(typedValueLower) ||
        toLowerCaseSafe(job.education).includes(typedValueLower) ||
        toLowerCaseSafe(job.instructions).includes(typedValueLower) ||
        toLowerCaseSafe(job.vacancy).includes(typedValueLower) ||
        toLowerCaseSafe(job.deadline).includes(typedValueLower) ||
        toLowerCaseSafe(job.employer.empname).includes(typedValueLower) ||
        job.benefits.some(benefit => toLowerCaseSafe(benefit).includes(typedValueLower))) &&
      (!searchBarData.location || toLowerCaseSafe(job.location).includes(toLowerCaseSafe(searchBarData.location))) &&
      (!searchBarData.keyword || toLowerCaseSafe(job.title).includes(toLowerCaseSafe(searchBarData.keyword))) &&
      (!searchBarData.jobtype || toLowerCaseSafe(job.jobtype) === toLowerCaseSafe(searchBarData.jobtype)) &&
      (!searchBarData.experience || toLowerCaseSafe(job.experience) === toLowerCaseSafe(searchBarData.experience)) &&
      (!searchBarData.skills || job.skills.some(skill => toLowerCaseSafe(skill).includes(toLowerCaseSafe(searchBarData.skills)))) &&
      (!searchBarData.salary || toLowerCaseSafe(job.salary).includes(toLowerCaseSafe(searchBarData.salary)))
    );
  }) : jobPostingsData;



  return (
<Container maxWidth='xl'>
    <Box 
      sx={{
        width: '100%',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 300px), 1fr))',
        gap: 2,
        p:1,
        flex:1,
      }}
    >
      {filteredJobPostings.length === 0 && <Typography fontSize={50} sx={{textAlign:'end',color:'black'}}>No Jobs Found</Typography>}

      {filteredJobPostings.map(job => (
        <Card key={job.jobid} size="lg" variant="outlined" sx={{ bgcolor: "#F1F1FF" }} >

          <Typography level="h2" sx={{alignSelf:'start', color: "#6865FF" }}>{job.title}</Typography>
          <Chip size="lg" variant="outlined" color="neutral" >
            {job.employer.empname}
          </Chip>
          
          
          <CardContent orientation='horizontal'>


              <Typography level="body-md"  startDecorator={< LocationOnIcon />}>{job.location}</Typography>
             
              <Divider orientation='vertical' inset='none' />
             
              <Typography level="body-md"    startDecorator={< PendingActionsIcon />}>{job.jobtype}</Typography>
             
              </CardContent>
         
          <CardContent orientation='horizontal'>
            <Typography level="body-md" startDecorator={< WorkHistoryIcon />}>{job.experience}</Typography>
            <Divider orientation='vertical' />
            <Typography level="body-md" startDecorator={< CurrencyRupeeIcon />}>{job.salary}</Typography>
          </CardContent>
          <CardActions sx={{width:100,alignSelf:'center'}}>

            
            <Button variant='outlined' sx={{bgcolor:'#6865ff',color:'white',":hover":{bgcolor:'#3936ea'}}}   onClick={() => handleDetailsButton(job.jobid)} >Details</Button>
            
          </CardActions>


        </Card>
      ))}

    </Box>
    </Container>
  );
};

export default JobPostings;



