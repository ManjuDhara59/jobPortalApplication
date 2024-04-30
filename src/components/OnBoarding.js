import React, { useState, useEffect } from 'react';
import EmployerData from '../Employerdata.json';
import axios from 'axios';
import { Avatar, Box, Button, ButtonGroup, Card, CardContent, CardOverflow, Chip, Typography } from '@mui/joy';
import { CardActions, Container, Paper } from '@mui/material';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import EmailIcon from '@mui/icons-material/Email';
import ContactPhoneIcon from '@mui/icons-material/ContactPhone';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';


const OnBoarding = () => {
  const [employers, setEmployers] = useState([]);

  useEffect(() => {
    console.log('Onboarding useeffect');

    const fetchData = async () => {
      try {
        let apiUrl = 'http://localhost:8080/employer/getRegisteredEmployers';

        const response = await axios.get(apiUrl);
        setEmployers(response.data)
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching job data:', error);
      }
    };


    fetchData();
  }, []);

  const handleReject = async (index) => {
    const userId = index;
    const response = await axios.delete(`http://localhost:8080/employer/rejectEmployer/${userId}`);
    
    console.log('Employer Rejected:', response);
    const updatedEmployers = employers.filter(employer => employer.empid !== index)
    
    setEmployers(updatedEmployers);

  };

  const handleAccept = async (index) => {
    const userId = index;
    const response = await axios.put(`http://localhost:8080/admin/credentials/${userId}`);
    
    const updatedEmployers = employers.filter(employer => employer.empid !== index)
    setEmployers(updatedEmployers);
  };

  return (
    
      <Container maxWidth='xl' sx={{bgcolor:'#8a8ac9',display:'flex',flexDirection:'column', minHeight:'100vh'}}>
        <Typography variant='h4' fontSize={30} sx={{p:1,m:1,color:'#2f2d2d',fontWeight:'bold'}}>Registered Employers</Typography>
      <Box
        sx={{
          width: '100%',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 300px), 1fr))',
          gap: 2,
        }}
      >
       {employers.length === 0 && <Typography> No employers have been registered yet. </Typography>} 
        {employers && employers.map((employer) => (
          
          <Card key={employer.empid}
            sx={{
              bgcolor:'#f1f1ff',
              maxWidth: '100%',
              boxShadow: 'lg',
              mb:2,
            }}
            
          >
            <CardContent sx={{ alignItems: 'center' }}>
              <Avatar sx={{ '--Avatar-size': '6rem',border:1,borderColor:'#0d084d' }} />             
              <Typography level="h3"  sx={{py:1,color:'#0d084d'}}>{employer.fullname}</Typography>
              
              <Typography level="body-md"  startDecorator={< BusinessCenterIcon/>}>{employer.empname}</Typography>
              <Typography level="body-md" startDecorator={< LocalPhoneIcon/>}>{employer.phone}</Typography>
              <Typography level="body-md" startDecorator={< EmailIcon/>}>{employer.email}</Typography>
              <Typography level="body-md" startDecorator={< AttachMoneyIcon/>}>{employer.subscriptionPlan.name}</Typography>
              
            </CardContent>

            <CardOverflow sx={{ bgcolor: 'background.level1' ,display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'center',
                  columnGap: 2, }}>
              <CardActions >
                
                  <Button variant='outlined' sx={{bgcolor:'white',width:90 ,color:'#342d93',":hover":{color:'#1d1861'}}} onClick={() => handleReject(employer.empid)} >Reject</Button>
                  <Button variant='contained' sx={{bgcolor:'#342d93',width:90 ,color:'white',":hover":{bgcolor:'#1d1861'}}} onClick={() => handleAccept(employer.empid)}>Accept</Button>
               
              </CardActions>
            </CardOverflow>

          </Card>
         

        ))}
       
      </Box>
      </Container>
    
  );
};

export default OnBoarding;
