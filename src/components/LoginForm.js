

import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import TextField from '@mui/material/TextField';
import { Button, Container, Typography } from '@mui/material';
import { Grid } from '@mui/joy';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const LoginForm = ({ handleLogin, error, userRole }) => {
  const initialValues = { username: "", email: "", password: "" };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
 
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
   
  };




  const handleSubmit = async () => {
    console.log('in submit');
    const errors = validate(formValues); 
    setFormErrors(errors); 

    console.log(Object.keys(errors).length);

    console.log(userRole);

    if (Object.keys(errors).length === 0) {
      setIsSubmit(true);
      console.log('hii');

      const { username, email, password } = formValues;
      console.log(userRole);
      try {
        const response = await axios.post('http://localhost:8080/login/authentication', {
          username,
          email,
          password,
          userRole
        });
        
        console.log(response.data); 

        const uid = response.data;
        console.log(typeof uid, uid);

        if (uid !== -1) {

          handleLogin(formValues, uid, navigate);
        }
      } catch (error) {
        console.error('Error:', error);
        if (error.response && error.response.status === 401 && error.response.data === -1) {
          toast.error('Please Enter Valid Credentials', {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        }
      }

    } else {

      setIsSubmit(false);
    }
  };

  const validate = (values) => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!values.username) {
      errors.username = "Username is required!";
     
    }
    if (!values.email) {
      errors.email = "Email is required!";
    } else if (!regex.test(values.email)) {
      errors.email = "Invalid Email Address";
    }
    if (!values.password) {
      errors.password = "Password is required";
    } else if (values.password.length < 5) {
      errors.password = "Password must be more than 4 characters";
    } else if (values.password.length > 10) {
      errors.password = "Password cannot exceed more than 10 characters";
    }

    return errors;
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
        <Container component="main" maxWidth='xs'
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
                Login
              </Typography>
            </Grid>

            <Grid item xs={8} >
              <TextField

                id="username"
                name="username"
                label="Username"
                placeholder="Username"
                value={formValues.username}
                onChange={handleChange}
                error={Boolean(formErrors.username)}
                helperText={formErrors.username || ''}
                required
                fullWidth
                variant='filled'
              />
            </Grid>

            <Grid item xs={8} >
              <TextField

                id="email"
                name="email"
                label="Email"
                placeholder="Email"
                value={formValues.email}
                onChange={handleChange}
                error={Boolean(formErrors.email)}
                helperText={formErrors.email || ''}
                required
                fullWidth
                variant='filled'
              />
            </Grid>

            <Grid item xs={8} >
              <TextField

                id="password"
                name="password"
                type='password'
                label="Password"
                placeholder="Password"
                value={formValues.password}
                onChange={handleChange}
                error={Boolean(formErrors.password)}
                helperText={formErrors.password || ''}
                required
                fullWidth
                variant='filled'
              />
            </Grid>

            <Grid item xs={5}>
              <Button variant="outlined" sx={{ bgcolor: '#6865ff', width: 90, color: 'white', ":hover": { bgcolor: '#3936ea' }, fontFamily: 'cursive', fontWeight: 'bold' }} onClick={handleSubmit}>Submit</Button>
            </Grid>

            <Grid item xs={12} >
              <Typography>Forgot Password ? <Link to="/forgot-password" style={{ color: '#6865ff' }}>Click here</Link></Typography>
            </Grid>

            <Grid item xs={12} >
              <Typography>Don't have an account? <Link to="/login" style={{ color: '#6865ff' }}>Sign Up</Link></Typography>
            </Grid>

          

          </Grid>
          <ToastContainer />
        </Container>
      </Grid>
    </Grid>
  );
};

export default LoginForm;
