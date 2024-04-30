import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Card from '@mui/joy/Card';
import CardActions from '@mui/joy/CardActions';
import Chip from '@mui/joy/Chip';
import Divider from '@mui/joy/Divider';
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import ListItemDecorator from '@mui/joy/ListItemDecorator';
import Typography from '@mui/joy/Typography';
import Check from '@mui/icons-material/Check';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import { Link, useLocation, useParams, useNavigate } from 'react-router-dom';
import SubscriptionPlanEditForm from './SubscriptionPlanEditForm';
import { Container } from '@mui/material';
import PlanCard from './PlanCard';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function SubscriptionPlans({userRole}) {

  const navigate = useNavigate();
  const location = useLocation();


  const [plans, setPlans] = useState([]);


  useEffect(() => {
    console.log('subscription plans');

    const fetchData = async () => {
      try {
        let apiUrl = 'http://localhost:8080/subscriptionplan/getAllPlans';

        const response = await axios.get(apiUrl);
        setPlans(response.data);
        console.log(response.data)
      } catch (error) {
        console.error('Error fetching job data:', error);
      }
    };

    fetchData();
  }, [location.pathname]);


  const handleDelete = async (id) => {
    
    const response = await axios.delete(`http://localhost:8080/subscriptionplan/delete/${id}`);
    toast.success('Successfully deleted the plans', {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "light",
     
    });
    
    console.log('Plan Deleted:', response);
    const updatedPlans = plans.filter(plan => plan.sid !== id);
   
    setPlans(updatedPlans);
  };

  const handleEdit = (id) => {
    navigate(`/edit-plan/${id}`);
    
  };

  const handleAddPlan = () => {
    navigate('/edit-plan');

  };

  return (
    <Container maxWidth='xl'
    sx={{
      
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      bgcolor:'#f1f1ff',
      minHeight:'100vh',
      p:2,
    }}
    >
      <Button
        variant="soft"
        color="neutral"
        
        endDecorator={<KeyboardArrowRight />}
        onClick={() => handleAddPlan()}
        sx={{bgcolor:'#636391',color:'whitesmoke',mb:2}}
      >
        Add Plan
      </Button>
    <Box
      sx={{
        width: '100%',
        display: 'grid',
        flex:1,
        gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 300px), 1fr))',
        gap: 2,
      }}
    >
      <PlanCard  handleEdit={handleEdit} handleDelete={handleDelete} userRole={userRole} />

     

    </Box>
    <ToastContainer/>
    </Container>
  );
}