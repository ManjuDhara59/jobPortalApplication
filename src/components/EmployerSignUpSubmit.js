import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PlanCard from './PlanCard';
import { Button, Container } from '@mui/material';
import { Box } from '@mui/joy';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from 'react-router-dom';


export default function EmployerSignUpSubmit({ employerDetails,userRole }) {

    const [subscriptionplanid, setSubscriptionplanid] = useState(null);
    const navigate = useNavigate();


    const handlePlan = (planid) => {
        console.log('handle plan', planid);
        setSubscriptionplanid(planid);
    }

    const handleSubmitButton = async ()=>{

        const updatedEmployerDetails = { ...employerDetails, subscriptionplanid };

        try {
            let apiUrl = 'http://localhost:8080/employer/saveemp';
    
            const response = await axios.post(apiUrl,updatedEmployerDetails);
            
            console.log(response.data)
            toast.success('Submitted successfully', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: "light",
                onClose: () =>navigate('/')
              });
          } catch (error) {
            console.error('Error fetching job data:', error);
          }

    }


    return (
        <Container maxWidth='xl'
        sx={{
      
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            bgcolor:'#f1f1ff',
            minHeight:'100vh',
            p:2,
          }}>
            <Box
                sx={{
                    width: '100%',
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 300px), 1fr))',
                    gap: 2,
                }}
            >
                <PlanCard handlePlan={handlePlan} subscriptionplanid={subscriptionplanid} userRole={userRole}/>
            </Box>

            <Button variant='contained' size='small' sx={{bgcolor:'#6865ff', color:'white',":hover":{bgcolor:'#3936ea'},fontFamily:'cursive',fontWeight:'bold',mt:3}} onClick={handleSubmitButton}>Submit</Button>
<ToastContainer/>
        </Container>
    );

}