import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Grid } from '@mui/joy';
import { Button, Container, TextField, Typography } from '@mui/material';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SignUpForm = ({ handleSignUpData }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    username: '',
    email: '',
    phoneNumber: '',
    password: ''
  });
  const [role, setRole] = useState({ userroles: "" });
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});

  useEffect(() => {
    
    if (role.userroles === "job seeker") {
      handleSignUpData(role, navigate);
      

    }
  }, [role, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    let errors = {};

    if (!formData.fullName.trim()) {
      errors.fullName = 'Full name is required';
    }

    if (!formData.username.trim()) {
      errors.username = 'username is required';
    }

    if (!formData.phoneNumber.trim()) {
      errors.phoneNumber = 'Phone number is required';
    } else if (!/^\d{10}$/.test(formData.phoneNumber.trim())) {
      errors.phoneNumber = 'Invalid phone number';
    }

    if (!formData.email.trim()) {
      errors.email = ' email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email.trim())) {
      errors.email = 'Invalid email address';
    }

    if (!formData.password.trim()) {
      errors.password = "Password is required";
    } else if (formData.password.trim().length < 4) {
      errors.password = "Password must be more than 4 characters";
    } else if (formData.password.trim().length > 10) {
      errors.password = "Password cannot exceed more than 10 characters";
    }

    return errors;
  };



  const handleSignUp = () => {
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length === 0) {
      const userData = {
        fullname: formData.fullName,
        username: formData.username,
        phone: formData.phoneNumber,
        email: formData.email,
        password: formData.password
      };
      console.log(formData.fullName, userData, 'hi');
      axios.post('http://localhost:8080/jobseeker/savejobseeker', userData)
        .then(response => {
          console.log('Sign up successful:', response.data);

          setRole({ userroles: "job seeker" });
          
        })
        .catch(error => {
          console.error('Sign up failed:', error.response.data);
          
        });



    } else {
      setErrors(validationErrors);
    }
    console.log('sign up')
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

      <Grid item md={7} sx={{ bgcolor: '#cacaf3' }} >
        <Container maxWidth='xs'
          sx={{
            marginTop: 8,
            marginBottom: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            py: 2,
            bgcolor: '#f1f1ff',
            borderRadius: 2,
            boxShadow: 6,
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
                value={formData.fullName}
                onChange={handleChange}
                error={Boolean(errors.fullName)}
                helperText={errors.fullName || ''}
                required
                fullWidth
              />
            </Grid>

            <Grid item xs={8} >
              <TextField

                id="username"
                name="username"
                label="Username"
                placeholder="Username"
                value={formData.username}
                onChange={handleChange}
                error={Boolean(errors.username)}
                helperText={errors.username || ''}
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
                value={formData.phoneNumber}
                onChange={handleChange}
                error={Boolean(errors.phoneNumber)}
                helperText={errors.phoneNumber || ''}
                required
                fullWidth
              />
            </Grid>

            <Grid item xs={8} >
              <TextField

                id="email"
                name="email"
                label="Email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                error={Boolean(errors.email)}
                helperText={errors.email || ''}
                required
                fullWidth
              />
            </Grid>

            <Grid item xs={8} >
              <TextField

                id="password"
                name="password"
                type='password'
                label="Password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                error={Boolean(errors.password)}
                helperText={errors.password || ''}
                required
                fullWidth
              />
            </Grid>

            <Grid item xs={5}>
              <Button variant="outlined" sx={{bgcolor:'#6865ff',width:130, color:'white',":hover":{bgcolor:'#3936ea'},fontFamily:'cursive',fontWeight:'bold'}} onClick={handleSignUp}>Sign Up</Button>
            </Grid>

            <Grid item xs={12} >
              <Typography>Already have an account?<Link to="/login"  style={{color:'#6865ff'}}>Login</Link></Typography>
            </Grid>
          </Grid>
        </Container>
      </Grid>
    </Grid>
  );
};

export default SignUpForm;



