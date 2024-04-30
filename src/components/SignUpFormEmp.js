
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import { Button, Container, Paper, Typography } from '@mui/material';
import { Grid } from '@mui/joy';


const SignUpFormEmp = ({ handleSignUpData, handleEmployerNext }) => {
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [companyEmail, setCompanyEmail] = useState('');
  const [selectedSubscription, setSelectedSubscription] = useState('');
  const [Plans, setPlans] = useState([]);
  const [role, setRole] = useState({ userroles: "" });
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [planid, setPlanid] = useState(null);



  const validateForm = () => {
    let errors = {};

    if (!fullName.trim()) {
      errors.fullName = 'Name is required';
    }

    if (!phoneNumber.trim()) {
      errors.phoneNumber = 'Phone number is required';
    } else if (!/^\d{10}$/.test(phoneNumber.trim())) {
      errors.phoneNumber = 'Invalid phone number';
    }

    if (!companyName.trim()) {
      errors.companyName = 'Company name is required';
    }

    if (!companyEmail.trim()) {
      errors.companyEmail = 'Company email is required';
    } else if (!/\S+@\S+\.\S+/.test(companyEmail.trim())) {
      errors.companyEmail = 'Invalid email address';
    }

    return errors;
  };



  const handleNextButton = () => {

    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length === 0) {
      const userData = {
        fullname: fullName,
        phone: phoneNumber,
        empname: companyName,
        email: companyEmail,
        resumedownloadcount: 0,
      };

      console.log(fullName, userData);

      handleEmployerNext(userData, navigate);


    } else {
      setErrors(validationErrors);
    }

  };



  return (

    <Grid container maxWidth="100%">

<Grid item md={5} sx={{ bgcolor: '#454580', padding: 4, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', fontFamily: 'Roboto, sans-serif', boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.1)' }}>
  <Typography variant="h4" sx={{ color: '#ffa726', fontWeight: 'bold', mb: 3, fontFamily: 'Arial, sans-serif' }}>
    Welcome to Our Job Portal!
  </Typography>
  <Typography variant="body1" align="center" sx={{ maxWidth: 300, color: '#ffffff', fontFamily: 'Arial, sans-serif', fontSize: '1.1rem', lineHeight: '1.6' }}>
    Discover <span style={{ color: '#ffcc80', fontWeight: 'bold' }}>exciting career opportunities</span> and <span style={{ color: '#ffcc80', fontWeight: 'bold' }}>connect with top employers</span> in your industry. Whether you're <span style={{ color: '#ffcc80', fontWeight: 'bold' }}>seeking a new job or looking to hire talented professionals,</span>  we've got you covered. Sign up today and take the <span style={{ color: '#ffcc80', fontWeight: 'bold' }}>next step towards your future success</span>!
  </Typography>
</Grid>

      <Grid item md={7} sx={{bgcolor:'#cacaf3'}} >
        
      <Container  maxWidth='xs'
        sx={{
          marginTop: 8,
          marginBottom: 4,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          py: 2,
          bgcolor:'#f1f1ff',
          borderRadius:2,
          boxShadow:6,
        }}
      >

        <Grid container rowSpacing={2} columnSpacing={2} justifyContent='center'>

          <Grid item xs={12}>
            <Typography variant='h4' >
              Join Us.
            </Typography>
          </Grid>

          <Grid item xs={8} >
            <TextField

              id="fullName"
              name="fullName"
              label="Full Name"
              placeholder="full Name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              error={Boolean(errors.fullName)}
              helperText={errors.fullName || ''}
              required
              fullWidth
            />
          </Grid>

          <Grid item xs={8} >
            <TextField

              id="companyName"
              name="companyName"
              label="Company Name"
              placeholder="Company Name"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              error={Boolean(errors.companyName)}
              helperText={errors.companyName || ''}
              required
              fullWidth
            />
          </Grid>

          <Grid item xs={8} >
            <TextField

              id="companyEmail"
              name="companyEmail"
              label="Company Email"
              placeholder="Company Email"
              value={companyEmail}
              onChange={(e) => setCompanyEmail(e.target.value)}
              error={Boolean(errors.companyEmail)}
              helperText={errors.companyEmail || ''}
              required
              fullWidth
            />
          </Grid>

          <Grid item xs={8} >
            <TextField

              id="phoneNumber"
              name="phoneNumber"
              label="Phone Number"
              placeholder="Phone Number"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              error={Boolean(errors.phoneNumber)}
              helperText={errors.phoneNumber || ''}
              required
              fullWidth
            />
          </Grid>

          <Grid item xs={5}>
            <Button variant="outlined" sx={{bgcolor:'#6865ff',width:90, color:'white',":hover":{bgcolor:'#3936ea'},fontFamily:'cursive',fontWeight:'bold'}} onClick={handleNextButton}>Next</Button>
          </Grid>

          <Grid item xs={12} >
            <Typography>Already have an account?<Link to="/login" style={{color:'#6865ff'}} >Login</Link></Typography>
          </Grid>


        </Grid>

      </Container>
      
      </Grid>

    </Grid>

    
  );
};

export default SignUpFormEmp;
