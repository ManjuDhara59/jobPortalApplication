import React, { useState, useEffect } from 'react';
import '../css/PlanCard.css';
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


export default function PlanCard({ handleDelete, handleEdit, employerDetails, userRole,handlePlan,subscriptionplanid }) {

  const [plans, setPlans] = useState([]);
  const location = useLocation();
  

  useEffect(() => {
    console.log('subscription plans userrole:',userRole);

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

  

  return (

    <>
      {plans && plans.map(plan => (
        <Card invertedColors={true} className="my-carddd" key={plan.sid} size="lg" variant="soft"  
        sx={{
          
          border: subscriptionplanid && subscriptionplanid === plan.sid ? '7px solid #5e5eaa' : '1px solid transparent', 
          
        }}
        onClick={() => userRole === 'employer' && handlePlan(plan.sid)}
        >
          <Chip size="md" variant="solid" sx={{ color: '#b6b6cd',fontWeight:'bold'}}>
            {plan.tag}
          </Chip>
          <Typography level="h2"  sx={{ color: '#e0e0ff' }}>{plan.name}</Typography>
          <Divider inset="none" sx={{bgcolor: '#b6b6cd'}}/>
          <List size="sm" sx={{ mx: 'calc(-1 * var(--ListItem-paddingX))' }}>

            <ListItem  sx={{ color: '#b6b6cd',fontWeight:'bold'}}>
              <ListItemDecorator>
                <Check />
              </ListItemDecorator >
              You can download upto {plan.resumecount} resumes
            </ListItem>

            <ListItem sx={{ color: '#b6b6cd',fontWeight:'bold'}}>
              <ListItemDecorator>
                <Check />
              </ListItemDecorator>
              You can post upto {plan.jobpostcount} jobs
            </ListItem>

            {plan.features.map((feature, index) => (
              <ListItem key={index} sx={{ color: '#b6b6cd',fontWeight:'bold'}}>
                <ListItemDecorator>
                  <Check />
                </ListItemDecorator>
                {feature}
              </ListItem>
            ))}
          </List>
          <Divider inset="none" sx={{bgcolor: '#b6b6cd'}}/>
          <CardActions>
            <Typography level="title-lg" sx={{ mr: 'auto',ml:0,color: '#e0e0ff',fontWeight:'bold' }}>
              {plan.price}{' '}
              <Typography fontSize="sm"  sx={{ color: '#b6b6cd',fontWeight:'bold'}}>
                / {plan.term}
              </Typography>
            </Typography>

            {userRole === 'admin' && (
              <>
                <Button
                  variant="soft"
                  color="neutral"
                  endDecorator={<KeyboardArrowRight />}
                  onClick={() => handleDelete(plan.sid)}
                >
                  Delete
                </Button>

                <Button
                  variant="soft"
                  color="neutral"
                  endDecorator={<KeyboardArrowRight />}
                  onClick={() => handleEdit(plan.sid)}
                >
                  Edit
                </Button>
              </>
            )}

          </CardActions>
        </Card>
      ))}

</>

    
  );
}