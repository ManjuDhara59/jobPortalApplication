import React, { useState } from 'react';
import axios from 'axios';
import { Box, Button, Container, StepLabel, Stepper, TextField, Typography } from '@mui/material';
import { Grid } from '@mui/joy';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


function PasswordResetForm({ userRole }) {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordMatchError, setPasswordMatchError] = useState('');
  const [emailError, setEmailError] = useState('');
  const navigate = useNavigate();

  const handleSubmitEmail = async (event) => {
    event.preventDefault();
    
    const emailRequest = {
        email: email,
        userRole: userRole
    };

    console.log(event.target.value);
    try {
      const response = await axios.put('http://localhost:8080/login/forgotPassword', emailRequest);
      console.log(response.data); 
      setEmailError('');
      setStep(2); 
    } catch (error) {
      console.error('Error sending OTP:', error);
      
      if (error.response && error.response.data && error.response.data.message) {
        setEmailError('User not found!');
      } else {
        setEmailError('Invalid Email Address');
      }
    }
  };

  const handleSubmitOTP = async(event) => {
    event.preventDefault();
   
    const emailRequest = {
        email: email,
        userRole: userRole,
        otp: otp
    };
    
    try {
        console.log(event.target.value);
    console.log(event);
        const response = await axios.post('http://localhost:8080/login/verifyOtp', emailRequest);
        console.log(response.data);
        setEmailError('');
        setStep(3); 
      } catch (error) {
        console.error('Error sending OTP:', error);
        
        if (error.response && error.response.data ) {
          setEmailError('Enter the Correct OTP');
        } else {
          setEmailError('Please enter valid OTP');
        }
      }
    
  };

  const handleSubmitNewPassword = (event) => {
    event.preventDefault();
    
    if (newPassword !== confirmPassword) {
      setEmailError("Passwords don't match");
      return;
    } else if (newPassword.length<5){
      setEmailError("Password must be more than 4 characters");
      return;
    }
  
    setEmailError('');
    
    setStep(4);
  
    postPasswordData();

    toast.success('Your password has been successfully reset', {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "light",
      onClose: () =>navigate('/login')
    });

    
    
  };

  const postPasswordData = async () => {
    
    const emailRequest = {
        email: email,
        userRole: userRole,
        password: newPassword
    };
    try {
      const response = await axios.put('http://localhost:8080/login/updatePassword', emailRequest);
      console.log(response.data); 
    } catch (error) {
      console.error('Error posting password data:', error);
      
    }
  };


  return (
<Container maxWidth='xl' sx={{bgcolor:'#8a8ac9',display:'flex'}}>
    <Container component="main" maxWidth='sm'
      sx={{
        marginTop: 8,
        marginBottom: 4,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        py: 2,
        bgcolor: '#f1f1ff',
        borderRadius:8
      }}
    >


<Grid container rowSpacing={3} columnSpacing={2} justifyContent='center'>

<Grid item xs={12}>
          <Typography variant='h4' sx={{color:'#494996',fontWeight:'bold',py:2 }}>
            Reset Your Password
          </Typography>
        </Grid>

        
        <Grid item xs={8} >
          <TextField

            id="email"
            name="email"
            label="Email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={step===1 && Boolean(emailError)}
            helperText={step===1 && (emailError || '')}
            required
            fullWidth
            variant='filled'
            disabled={step!==1}
          />
          <Button onClick={handleSubmitEmail} disabled={step!==1} variant='contained' size='small' sx={{bgcolor:'#6865ff', color:'white',":hover":{bgcolor:'#3936ea'},fontFamily:'cursive',fontWeight:'bold',mt:2}}>Send OTP</Button>
        </Grid>

        <Grid item xs={8} >
          <TextField

            id="otp"
            name="otp"
            label="OTP"
            placeholder="Enter the OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            error={Boolean(step===2 && emailError)}
            helperText={step===2 && (emailError || '')}
            required
            fullWidth
            variant='filled'
            disabled={step!==2}
          />
          <Button onClick={handleSubmitOTP} disabled={step!==2} variant='contained' size='small' sx={{bgcolor:'#6865ff', color:'white',":hover":{bgcolor:'#3936ea'},fontFamily:'cursive',fontWeight:'bold',mt:2}}>Verify OTP</Button>
        </Grid>

        <Grid item xs={8} >
          <TextField

            id="password"
            name="password"
            type='password'
            label="New Password"
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            error={Boolean(step===3 && emailError)}
            helperText={step ===3 && (emailError || '')}
            required
            fullWidth
            variant='filled'
            disabled={step!==3}
          />
        </Grid>

        <Grid item xs={8} >
          <TextField

            id="confirmpassword"
            name="confirmpassword"
            type='password'
            label="Confirm Password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            error={Boolean(step===3 && emailError)}
            helperText={step===3 && (emailError || '')}
            required
            fullWidth
            variant='filled'
            disabled={step!==3}
          />
          <Button onClick={handleSubmitNewPassword} variant='contained' size='small' sx={{bgcolor:'#6865ff', color:'white',":hover":{bgcolor:'#3936ea'},fontFamily:'cursive',fontWeight:'bold',mt:2}}>Submit</Button>
        </Grid>
</Grid>
</Container>
<ToastContainer/>
</Container>
   

    
  );
}

export default PasswordResetForm;
