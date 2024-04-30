import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { Button, Container, InputLabel, TextField, Typography } from '@mui/material';
import { FormControl, FormHelperText, Grid, Input } from '@mui/joy';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const JobApplicationForm = ({ handleApplied }) => {
    const navigate = useNavigate();
    const { userId, jobId } = useParams();


    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phoneNumber: '',
        address: '',
        resume: null,
        highestEducationLevel: '',
        institutionName: '',
        fieldOfStudy: '',
        graduationYear: '',
        previousEmployers: [],
        jobTitles: [],
        skills: [],
        applieddate: '',
        certifications: []
    });

    console.log(userId, typeof jobId)
    const [errors, setErrors] = useState({});
    const [applied, setApplied] = useState(true);

    const fileInputRef = useRef(null);

    const handleButtonClick = () => {
        fileInputRef.current.click();
    };


    useEffect(() => {
       
        if (!applied) {
            toast.success('Your application has been successfully submitted', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: "light",
                onClose: () =>handleApplied(applied, userId, jobId, navigate)
              });
            
            
        }
    }, [applied, navigate]);

    const handleChange = (e) => {
        const { name, value, type, files } = e.target;
        if (type === 'file') {
            const file = files[0];
            const reader = new FileReader();
            reader.readAsArrayBuffer(file);
            
            reader.onload = (event) => {
                const byteArray = new Uint8Array(event.target.result);
               
                setFormData({ ...formData, [name]: byteArray });
            };


        } else {
           
            setFormData({ ...formData, [name]: value });
        }


    };

    const handleCancel = () => {

        navigate(`/${userId}/job/${jobId}`);

    }

    const handlejobTitleChange = (index, value) => {
        const updatedjobTitles = [...formData.jobTitles];
        updatedjobTitles[index] = value;
        setFormData({ ...formData, jobTitles: updatedjobTitles });
    };

    const handleAddjobTitle = () => {
        setFormData({ ...formData, jobTitles: [...formData.jobTitles, ''] });
    };

    const handleRemovejobTitle = (index) => {
        const updatedjobTitles = [...formData.jobTitles];
        updatedjobTitles.splice(index, 1);
        setFormData({ ...formData, jobTitles: updatedjobTitles });
    };

    const handleEmployerChange = (index, value) => {
        const updatedEmployers = [...formData.previousEmployers];
        updatedEmployers[index] = value;
        setFormData({ ...formData, previousEmployers: updatedEmployers });
    };

    const handleAddEmployer = () => {
        setFormData({ ...formData, previousEmployers: [...formData.previousEmployers, ''] });
    };

    const handleRemoveEmployer = (index) => {
        const updatedEmployers = [...formData.previousEmployers];
        updatedEmployers.splice(index, 1);
        setFormData({ ...formData, previousEmployers: updatedEmployers });
    };

    const handlecertificationChange = (index, value) => {
        const updatedcertifications = [...formData.certifications];
        updatedcertifications[index] = value;
        setFormData({ ...formData, certifications: updatedcertifications });
    };

    const handleAddcertification = () => {
        setFormData({ ...formData, certifications: [...formData.certifications, ''] });
    };

    const handleRemovecertifications = (index) => {
        const updatedcertifications = [...formData.certifications];
        updatedcertifications.splice(index, 1);
        setFormData({ ...formData, certifications: updatedcertifications });
    };


    const handleSkillChange = (index, value) => {
        const updatedSkills = [...formData.skills];
        updatedSkills[index] = value;
        setFormData({ ...formData, skills: updatedSkills });
    };


    const handleAddSkill = () => {
        setFormData({ ...formData, skills: [...formData.skills, ''] });
    };

    const handleRemoveSkill = (index) => {
        const updatedSkills = [...formData.skills];
        updatedSkills.splice(index, 1);
        setFormData({ ...formData, skills: updatedSkills });
    };




    const handleSubmit = async (e) => {
        e.preventDefault();

        const validationErrors = validateForm(formData);

        const { resume } = formData;

        if (Object.keys(validationErrors).length === 0) {

            const currentDate = new Date().toISOString().split('T')[0];


            const userData = {
                seekerid: userId,
                jobid: jobId,
                applicationstatus: 'submitted',
                rejected: false,
                applieddate: currentDate,
                resume: resume
            };

        

            try {

                const response = await axios.post(`http://localhost:8080/jobapplication/saveJobApplication`, userData);
                console.log('Application submitted successfully:', response.data);
                const resumeData = new FormData();
                const blob = new Blob([resume], { type: 'application/pdf' });
                resumeData.append('resume', blob, 'resume.pdf');
                const res = await axios.post(`http://localhost:8080/jobapplication/upload/${userId}/${jobId}`, resumeData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });
               
                
                setApplied(false);
                
            } catch (error) {
                console.error('Error submitting application:', error);
            }



        } else {

            setErrors(validationErrors);
        }

        console.log('application form job')

    };

    const validateForm = (values) => {
        const newErrors = {};
        //console.log(formData);
        if (!values.fullName.trim()) {
            newErrors.fullName = 'Title is required';
        }
        if (!values.address.trim()) {
            newErrors.address = 'Address is required';
        }

        if (!values.resume) {
            newErrors.resume = 'Resume is required';
        }
        if (!values.highestEducationLevel.trim()) {
            newErrors.highestEducationLevel = 'Highest Level of Education is required';
        }
        if (!values.institutionName.trim()) {
            newErrors.institutionName = 'Name of the Institution is required';
        }
        if (!values.fieldOfStudy.trim()) {
            newErrors.fieldOfStudy = 'Field of Study is required';
        }
        
        if (!values.graduationYear.trim()) {
            newErrors.graduationYear = 'Graduation Year is required';
        }
        if (!values.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Invalid email format';
        }
        if (!values.phoneNumber.trim()) {
            newErrors.phoneNumber = 'Phone Number is required';
        } else if (!/^\d{10}$/.test(formData.phoneNumber.trim())) {
            newErrors.phoneNumber = 'Invalid Phone Number';
        }



        return newErrors;
    };



    return (

        <Container maxWidth='xl' sx={{bgcolor:'#8a8ac9',display:'flex'}}>
        <Container  maxWidth='md'
            sx={{
                marginTop: 8,
                marginBottom: 4,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                py: 2,
                bgcolor: '#f1f1ff',
            }}
        >

            <Grid container spacing={4} justifyContent='center' >

                <Grid item xs={12}>
                    <Typography variant='h4' sx={{ textAlign: 'left',color:'#494996',fontWeight:'bold' }} >
                        Job Application Form
                    </Typography>
                </Grid>

                <Grid item xs={12}>
                    <Typography variant='body1' textAlign='left' >
                        1.Personal Details
                    </Typography>
                </Grid>

                <Grid item xs={12} md={4}>
                    <TextField
                        id="fullName"
                        name="fullName"
                        label="Full Name"
                        placeholder="Full Name"
                        value={formData.fullName}
                        onChange={handleChange}
                        error={Boolean(errors.fullName)}
                        helperText={errors.fullName || ''}
                        required
                        fullWidth
                        variant='filled'
                    />
                </Grid>

                <Grid item xs={12} md={4}>
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
                        variant='filled'
                    />
                </Grid>

                <Grid item xs={12} md={4}>
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
                        variant='filled'
                    />
                </Grid>

                <Grid item xs={12} >
                    <TextField
                        id="address"
                        name="address"
                        label="Address"
                        placeholder="Address"
                        value={formData.address}
                        onChange={handleChange}
                        error={Boolean(errors.address)}
                        helperText={errors.address || ''}
                        required
                        fullWidth
                        variant='filled'
                        multiline
                        rows={5}
                    />
                </Grid>

                <Grid item xs={12}>
                    <Typography variant='body1' textAlign='left' >
                        2.Education Details
                    </Typography>
                </Grid>

                <Grid item xs={12} md={6}>
                    <TextField
                        id="highestEducationLevel"
                        name="highestEducationLevel"
                        label="Higest Level of Education"
                        placeholder="Higest Level of Education"
                        value={formData.highestEducationLevel}
                        onChange={handleChange}
                        error={Boolean(errors.highestEducationLevel)}
                        helperText={errors.highestEducationLevel || ''}
                        required
                        fullWidth
                        variant='filled'
                    />
                </Grid>

                <Grid item xs={12} md={6}>
                    <TextField
                        id="institutionName"
                        name="institutionName"
                        label="Name of the Institution"
                        placeholder="Name of the Institution"
                        value={formData.institutionName}
                        onChange={handleChange}
                        error={Boolean(errors.institutionName)}
                        helperText={errors.institutionName || ''}
                        required
                        fullWidth
                        variant='filled'
                    />
                </Grid>

                <Grid item xs={12} md={6}>
                    <TextField
                        id="fieldOfStudy"
                        name="fieldOfStudy"
                        label="Field of Study"
                        placeholder="Field of Study"
                        value={formData.fieldOfStudy}
                        onChange={handleChange}
                        error={Boolean(errors.fieldOfStudy)}
                        helperText={errors.fieldOfStudy || ''}
                        required
                        fullWidth
                        variant='filled'
                    />
                </Grid>

                <Grid item xs={12} md={6}>
                    <TextField
                        id="graduationYear"
                        name="graduationYear"
                        label="Year of Graduation"
                        placeholder="Year of Graduation"
                        value={formData.graduationYear}
                        onChange={handleChange}
                        error={Boolean(errors.graduationYear)}
                        helperText={errors.graduationYear || ''}
                        required
                        fullWidth
                        variant='filled'
                    />
                </Grid>

                <Grid item xs={12}>
                    <Typography variant='body1' textAlign='left' >
                        3.Previous Employers <span>(if any)</span>
                    </Typography>
                </Grid>

                <Grid item xs={12} md={6}>
                    <Typography sx={{ mb: 1 }} textAlign='left'>Employers: <Button  variant='contained' size='small' sx={{bgcolor:'#6865ff', color:'white',mx:1,":hover":{bgcolor:'#3936ea'},fontFamily:'cursive',fontWeight:'bold'}} onClick={handleAddEmployer}>Add Employer</Button></Typography>

                    {formData && formData.previousEmployers.map((employer, index) => (
                        <div key={index}>
                            <TextField

                                label={`Employer ${index + 1}`}
                                placeholder="Employer Name"
                                value={employer}
                                onChange={(e) => handleEmployerChange(index, e.target.value)}
                                error={Boolean(errors.previousEmployers)}
                                helperText={errors.previousEmployers || ''}

                                fullWidth
                                variant='filled'

                            />

                            <Grid item>
                                <Button variant='contained' size='small' sx={{bgcolor:'#6865ff', color:'white',":hover":{bgcolor:'#3936ea'},fontFamily:'cursive',fontWeight:'bold',mb:1}} onClick={() => handleRemoveEmployer(index)}>Remove</Button>
                            </Grid>

                        </div>
                    ))}

                </Grid>

                <Grid item xs={12} md={6}>
                    <Typography sx={{ mb: 1 }} textAlign='left'>Job Titles: <Button variant='contained' size='small' sx={{bgcolor:'#6865ff',mx:1, color:'white',":hover":{bgcolor:'#3936ea'},fontFamily:'cursive',fontWeight:'bold'}} onClick={handleAddjobTitle}>Add Job Title</Button></Typography>

                    {formData && formData.jobTitles.map((jobTitle, index) => (
                        <div key={index}>
                            <TextField

                                label={`Job Title ${index + 1}`}
                                placeholder="Job Title"
                                value={jobTitle}
                                onChange={(e) => handlejobTitleChange(index, e.target.value)}
                                error={Boolean(errors.jobTitles)}
                                helperText={errors.jobTitles || ''}

                                fullWidth
                                variant='filled'

                            />

                            <Grid item>
                                <Button variant='contained' size='small' sx={{bgcolor:'#6865ff', color:'white',":hover":{bgcolor:'#3936ea'},fontFamily:'cursive',fontWeight:'bold',mb:1}} onClick={() => handleRemovejobTitle(index)}>Remove</Button>
                            </Grid>

                        </div>
                    ))}

                </Grid>

                <Grid item xs={12} md={6}>
                    <Typography sx={{ mb: 1 }} textAlign='left'>5. Skills: <Button variant='contained' size='small' sx={{bgcolor:'#6865ff', color:'white',mx:1,":hover":{bgcolor:'#3936ea'},fontFamily:'cursive',fontWeight:'bold'}} onClick={handleAddSkill}>Add Skill</Button></Typography>


                    {formData && formData.skills.map((skill, index) => (
                        <div key={index}>
                            <TextField

                                label={`Skill ${index + 1}`}
                                placeholder="Skill"
                                value={skill}
                                onChange={(e) => handleSkillChange(index, e.target.value)}
                                error={Boolean(errors.skills)}
                                helperText={errors.skills || ''}
                                required
                                fullWidth
                                variant='filled'

                            />

                            <Grid item>
                                <Button variant='contained' size='small' sx={{bgcolor:'#6865ff', color:'white',":hover":{bgcolor:'#3936ea'},fontFamily:'cursive',fontWeight:'bold',mb:1}} onClick={() => handleRemoveSkill(index)}>Remove</Button>
                            </Grid>

                        </div>
                    ))}



                </Grid>

                <Grid item xs={12} md={6}>
                    <Typography sx={{ mb: 1 }} textAlign='left'>6. Certifications: <Button variant='contained' size='small' sx={{bgcolor:'#6865ff', color:'white',mx:1,":hover":{bgcolor:'#3936ea'},fontFamily:'cursive',fontWeight:'bold'}} onClick={handleAddcertification}>Add Certification</Button></Typography>


                    {formData && formData.certifications.map((certification, index) => (
                        <div key={index}>
                            <TextField

                                label={`Certification ${index + 1}`}
                                placeholder="Certification"
                                value={certification}
                                onChange={(e) => handlecertificationChange(index, e.target.value)}
                                error={Boolean(errors.certifications)}
                                helperText={errors.certifications || ''}
                                required
                                fullWidth
                                variant='filled'

                            />

                            <Grid item>
                                <Button variant='contained' size='small' sx={{bgcolor:'#6865ff', color:'white',":hover":{bgcolor:'#3936ea'},fontFamily:'cursive',fontWeight:'bold',mb:1}}  onClick={() => handleRemovecertifications(index)}>Remove</Button>
                            </Grid>

                        </div>
                    ))}
                </Grid>

                <Grid  item xs={12} md={12}   >
                    <FormControl error={Boolean(errors.resume)} sx={{ flexDirection:'column',alignItems:'center'}}>
                        <InputLabel htmlFor="resume" sx={{my:1}}>7. Resume (PDF only)</InputLabel>
                        <Input
                            type="file"
                            id="resume"
                            name="resume"
                            accept=".pdf"
                            required
                            onChange={handleChange}
                            sx={{width:200,p:1,textAlign:'right',border:2,borderColor:'#6865ff',}}
                        />
                        <FormHelperText >{errors.resume}</FormHelperText>
                    </FormControl>
                </Grid>

                <Grid container item xs={12} md={3}   >
                    <Button onClick={handleSubmit} variant='contained' size='small' sx={{bgcolor:'#6865ff', color:'white',":hover":{bgcolor:'#3936ea'},fontFamily:'cursive',fontWeight:'bold',m:2}}>Submit</Button>
                    <Button onClick={handleCancel} size='small' variant='outlined' sx={{ m:2,bgcolor:'white', color:'#6865ff',":hover":{bgcolor:'#d5d5f5'},fontFamily:'cursive',fontWeight:'bold' }}>Cancel</Button>
                </Grid>

            </Grid>

        </Container>
        <ToastContainer/>
        </Container>


    );
};

export default JobApplicationForm;
