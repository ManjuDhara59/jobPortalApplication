import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Grid from '@mui/joy/Grid';
import { Container, Typography } from '@mui/material';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";



const SubscriptionPlanEditForm = ({ onCancel }) => {
    const [editedPlan, setEditedPlan] = useState({
        sid: 1,
        name: '',
        price: '',
        tag: '',
        term: '',
        resumecount: '',
        jobpostcount: '',
        features: []
    });


    const location = useLocation();
    const { planId } = useParams();
    const navigate = useNavigate();
    console.log(planId);

    useEffect(() => {
        
        if (planId) {
            
            axios.get(`http://localhost:8080/subscriptionplan/getPlan/${planId}`)
                .then(response => {
                    setEditedPlan(response.data); 
                })
                .catch(error => {
                    console.error('Error fetching plan:', error);
                });
        }
    }, [planId]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditedPlan({ ...editedPlan, [name]: value });
    };

    const handleFeatureChange = (index, value) => {
        const updatedFeatures = [...editedPlan.features];
        updatedFeatures[index] = value;
        setEditedPlan({ ...editedPlan, features: updatedFeatures });
    };

    const handleAddFeature = () => {
        setEditedPlan({ ...editedPlan, features: [...editedPlan.features, ""] });
    };

    const handleRemoveFeature = (index) => {
        const updatedFeatures = [...editedPlan.features];
        updatedFeatures.splice(index, 1);
        setEditedPlan({ ...editedPlan, features: updatedFeatures });
    };

    const handleCancel = () => {
        
        navigate('/subscription-plans');
    }
    const handleSave = async (e) => {
        e.preventDefault();
        try {
            
            if (planId) {
                console.log(editedPlan);
               
                const response = await axios.put(`http://localhost:8080/subscriptionplan/updatePlan/${planId}`, editedPlan);
                
                console.log('Plan updated:', response);
                if (response.status === 200) {
                    toast.success('Successfully updated the plan', {
                        position: "top-right",
                        autoClose: 2000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: false,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                        onClose: () => navigate('/subscription-plans')
                      });
                   
                    
                }
               
            } else {

                const { sid, ...newplan } = editedPlan;
               
                const response = await axios.post('http://localhost:8080/subscriptionplan/addPlan', newplan);
                
                console.log('Plan added:', response);
                if (response.status === 201) {
                    
                    toast.success('Successfully updated the plan', {
                        position: "top-right",
                        autoClose: 2000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: false,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                        onClose: () => navigate('/subscription-plans')
                      });
                }
                
            }
        } catch (error) {
            
            console.error('Error:', error);
        }
    };

    return (

        <Container maxWidth='xl' sx={{ bgcolor: '#cacaf3', display: 'flex', minHeight: '100vh' }}>
            <Container maxWidth="sm"
                sx={{
                    marginTop: 6,
                    marginBottom: 4,
                    py: 2,
                    display: 'flex',
                    flex:1,
                    flexDirection: 'column',
                    alignItems: 'center',
                    bgcolor: '#f1f1ff',
                    borderRadius: 2,
                    boxShadow: 6,
                    Height:400,
                    
                }}
            >

                <Grid container rowSpacing={1} columnSpacing={2} >

                    <Grid item xs={12}>
                        <Typography variant='h4' sx={{pt:5}} >
                            {planId ? 'Edit' : 'Set'} Subscription Plan
                        </Typography>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <TextField
                            id="name"
                            name="name"
                            label="Name"
                            value={editedPlan.name}
                            onChange={handleInputChange}
                            fullWidth
                            variant="outlined"
                            margin="normal"
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            id="price"
                            name="price"
                            label="Price"
                            value={editedPlan.price}
                            onChange={handleInputChange}
                            fullWidth
                            variant="outlined"
                            margin="normal"
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            id="tag"
                            name="tag"
                            label="Tag"
                            value={editedPlan.tag}
                            onChange={handleInputChange}
                            fullWidth
                            variant="outlined"
                            margin="normal"
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            id="term"
                            name="term"
                            label="Term"
                            value={editedPlan.term}
                            onChange={handleInputChange}
                            fullWidth
                            variant="outlined"
                            margin="normal"
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            id="resumecount"
                            name="resumecount"
                            label="No of Resumes"
                            value={editedPlan.resumecount}
                            onChange={handleInputChange}
                            fullWidth
                            variant="outlined"
                            margin="normal"
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            id="jobpostcount"
                            name="jobpostcount"
                            label="No of Posts Allowed"
                            value={editedPlan.jobpostcount}
                            onChange={handleInputChange}
                            fullWidth
                            variant="outlined"
                            margin="normal"
                        />
                    </Grid>

                    <Grid item xs={12} >
                        {editedPlan && editedPlan.features.map((feature, index) => (
                            <div key={index}>

                                <TextField
                                    label={`Feature ${index + 1}`}
                                    value={feature}
                                    onChange={(e) => handleFeatureChange(index, e.target.value)}
                                    fullWidth
                                    variant="outlined"
                                    margin="normal"
                                />
                                <Grid item>
                                    <Button variant="outlined" color="secondary" onClick={() => handleRemoveFeature(index)}>Remove</Button>
                                </Grid>
                            </div>
                        ))}
                    </Grid>

                    <Grid item xs={12} >
                        <Button variant='contained' sx={{bgcolor:'#6865ff',width:140, color:'white',":hover":{bgcolor:'#3936ea'},fontFamily:'cursive',fontWeight:'bold'}} onClick={handleAddFeature}>Add Feature</Button>
                    
                    
                        <Button variant='outlined'  sx={{bgcolor:'#f6f6ff',width:130,mx:2, color:'#6865ff',":hover":{bgcolor:'#d5d5f5'},fontFamily:'cursive',fontWeight:'bold' }} onClick={handleSave}>Save</Button>
                    
                    
                        <Button variant='contained' sx={{bgcolor:'#6865ff', width:130,color:'white',":hover":{bgcolor:'#3936ea'},fontFamily:'cursive',fontWeight:'bold'}} fullWidth color="secondary" onClick={handleCancel}>Cancel</Button>
                    </Grid>

                </Grid>
            </Container>
            <ToastContainer/>
        </Container>
    );
};

export default SubscriptionPlanEditForm;
