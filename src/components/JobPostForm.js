import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { Button, Container, TextField, Typography } from '@mui/material';
import { Grid } from '@mui/joy';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const JobPostForm = () => {
    const navigate = useNavigate();
    const { userId, jobId } = useParams();

    const [formData, setFormData] = useState({
        jobid: '',
        title: '',
        company: '',
        location: '',
        salary: '',
        experience: '',
        vacancy: '',
        jobtype: '',
        description: '',
        skills: [],
        education: '',
        benefits: [],
        deadline: '',
        aboutthecompany: '',
        posteddate: '',
        employer: userId
    });
    const [newSkill, setNewSkill] = useState('');
    const [errors, setErrors] = useState({});

    const currentDate = new Date().toISOString().split('T')[0];
    console.log(typeof currentDate);

    useEffect(() => {
        
        if (jobId) {
            
            axios.get(`http://localhost:8080/job/getJobDetailsById/${jobId}`)
                .then(response => {
                    console.log(response.data)
                    const { employer, ...newData } = response.data;

                    setFormData({ ...newData, company: employer.empname });
                   
                })
                .catch(error => {
                    console.error('Error fetching plan:', error);
                });
        }
    }, [jobId]);


    const handleChange = (e) => {
        const { name, value } = e.target;
        
        setFormData({ ...formData, [name]: value });


    };

    const handleSkillChange = (index, value) => {
        const updatedSkills = [...formData.skills];
        updatedSkills[index] = value;
        setFormData({ ...formData, skills: updatedSkills });
    };

    const handleBenefitChange = (index, value) => {
        const updatedbenefits = [...formData.benefits];
        updatedbenefits[index] = value;
        setFormData({ ...formData, benefits: updatedbenefits });
    };

 
    const handleAddSkill = () => {
        setFormData({ ...formData, skills: [...formData.skills, ''] });
    };

    const handleAddBenefit = () => {
        setFormData({ ...formData, benefits: [...formData.benefits, ''] });
    };

    const handleRemoveSkill = (index) => {
        const updatedSkills = [...formData.skills];
        updatedSkills.splice(index, 1);
        setFormData({ ...formData, skills: updatedSkills });
    };

    const handleRemoveBenefit = (index) => {
        const updatedbenefits = [...formData.benefits];
        updatedbenefits.splice(index, 1);
        setFormData({ ...formData, benefits: updatedbenefits });
    };

    const handleCancel = () => {
        if (jobId){
        navigate(`/${userId}/job/${jobId}`);
        } else{
            navigate(`/`);
        }

    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const errorsData = validateForm(formData);
        setErrors(errorsData);
       

        if (Object.keys(errorsData).length === 0) {
            try {

                if (jobId) {
                    console.log(formData);
                    const response = await axios.put(`http://localhost:8080/job/updateJob/${jobId}`, formData);
                
                    console.log('Job updated:', response.data);
                    toast.success('Successfully updated the details', {
                        position: "top-right",
                        autoClose: 2000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: false,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                        onClose: () =>navigate(`/posted-jobs/${userId}`)
                      });
                    
                } else {

                    const currentDate = new Date().toISOString().split('T')[0];
                    const postedDeadline = formData.deadline.split('T')[0];
                    const { jobid, ...newdata } = formData;
                    newdata.posteddate = currentDate;
                    newdata.deadline = postedDeadline;
                    
                    const response = await axios.post('http://localhost:8080/job/savejob', newdata);
                    console.log('Job Saved:', response.data);
                    toast.success('Successfully posted the details', {
                        position: "top-right",
                        autoClose: 2000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: false,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                        onClose: () =>navigate(`/posted-jobs/${userId}`)
                      });
                    
                }
            } catch (error) {
                console.error('Error posting job:', error);
            }
        }
    };

    const validateForm = (values) => {
        const newErrors = {};
        if (!values.title.trim()) {
            newErrors.title = 'Title is required';
        }
    

        if (!values.location.trim()) {
            newErrors.location = 'Location is required';
        }
        if (!values.salary.trim()) {
            newErrors.salary = 'Salary is required';
        }
        if (!values.experience.trim()) {
            newErrors.experience = 'Experience is required';
        }
        if (!values.description.trim()) {
            newErrors.description = 'Sescription is required';
        }
        if (values.skills.length === 0 && formData.skills.filter(skill => skill.trim() !== '').length === 0) {
            newErrors.skills = 'Skills is required';
        }
        if (!values.vacancy.trim()) {
            newErrors.vacancy = 'Vacancy is required';
        }
        if (!values.jobtype.trim()) {
            newErrors.jobtype = 'Job type is required';
        }
        if (!values.education.trim()) {
            newErrors.education = 'Education is required';
        }
        if (values.benefits.length === 0) {
            newErrors.benefits = 'Benefits is required';
        }

        if (!values.deadline.trim()) {
            newErrors.deadline = 'Seadline is required';
        }


        if (!values.aboutthecompany.trim()) {
            newErrors.aboutthecompany = 'About the company is required';
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

            <Grid container spacing={4} justifyContent='flex-end' >

                <Grid item xs={12} >
                    <Typography variant='h4' sx={{ textAlign: 'left',color:'#494996',fontWeight:'bold' }}>
                    Job {jobId ? 'Edit':'Post'}  Form
                    </Typography>
                </Grid>

                <Grid item xs={12} md={6}>
                    <TextField
                        id="title"
                        name="title"
                        label="Title"
                        placeholder="Job Title"
                        value={formData.title}
                        onChange={handleChange}
                        error={Boolean(errors.title)}
                        helperText={errors.title || ''}
                        required
                        fullWidth
                        variant='filled'
                    />
                </Grid>

                <Grid item xs={12} md={6} >

                    <TextField
                        id="location"
                        name="location"
                        label="Location"
                        placeholder="Job Location"
                        value={formData.location}
                        onChange={handleChange}
                        error={Boolean(errors.location)}
                        helperText={errors.location || ''}
                        required
                        fullWidth
                        variant='filled'
                    />

                </Grid>

                <Grid item xs={12} md={6} >

                    <TextField
                        id="salary"
                        name="salary"
                        label="Salary"
                        placeholder="Salary"
                        value={formData.salary}
                        onChange={handleChange}
                        error={Boolean(errors.salary)}
                        helperText={errors.salary || ''}
                        required
                        fullWidth
                        variant='filled'
                    />

                </Grid>

                <Grid item xs={12} md={6} >

                    <TextField
                        id="experience"
                        name="experience"
                        label="Experience"
                        placeholder="Experience"
                        value={formData.experience}
                        onChange={handleChange}
                        error={Boolean(errors.experience)}
                        helperText={errors.experience || ''}
                        required
                        fullWidth
                        variant='filled'
                    />

                </Grid>

                <Grid item xs={12} md={6} >

                    <TextField
                        id="jobtype"
                        name="jobtype"
                        label="Job Type"
                        placeholder="Job Type"
                        value={formData.jobtype}
                        onChange={handleChange}
                        error={Boolean(errors.jobtype)}
                        helperText={errors.jobtype || ''}
                        required
                        fullWidth
                        variant='filled'
                    />

                </Grid>

                <Grid item xs={12} md={6} >

                    <TextField
                        id="vacancy"
                        name="vacancy"
                        label="Vacancy"
                        placeholder="Vacancy"
                        value={formData.vacancy}
                        onChange={handleChange}
                        error={Boolean(errors.vacancy)}
                        helperText={errors.vacancy || ''}
                        required
                        fullWidth
                        variant='filled'
                    />

                </Grid>

                <Grid item xs={12} >

                    <TextField
                        id="description"
                        name="description"
                        label="Description"
                        placeholder="Description"
                        value={formData.description}
                        onChange={handleChange}
                        error={Boolean(errors.description)}
                        helperText={errors.description || ''}
                        required
                        fullWidth
                        variant='filled'
                        multiline
                        rows={5}
                    />

                </Grid>

                <Grid item xs={12} >

                    <TextField
                        id="aboutthecompany"
                        name="aboutthecompany"
                        label="About The Company"
                        placeholder="About The Company"
                        value={formData.aboutthecompany}
                        onChange={handleChange}
                        error={Boolean(errors.aboutthecompany)}
                        helperText={errors.aboutthecompany || ''}
                        required
                        fullWidth
                        variant='filled'
                        multiline
                        rows={5}
                    />

                </Grid>

                <Grid item xs={12} md={6} >

                    <TextField
                        id="education"
                        name="education"
                        label="Highest Education"
                        placeholder="Highest Education Required for job role"
                        value={formData.education}
                        onChange={handleChange}
                        error={Boolean(errors.education)}
                        helperText={errors.education || ''}
                        required
                        fullWidth
                        variant='filled'
                    />

                </Grid>

                <Grid item xs={12} md={6} >

                    <TextField
                        id="deadline"
                        name="deadline"
                        type="date"
                        label="Deadline"
                        hiddenLabel={false}
                        value={formData.deadline}
                        onChange={handleChange}
                        error={Boolean(errors.deadline)}
                        helperText={errors.deadline || ''}
                        required
                        fullWidth
                        variant='filled'
                    />

                </Grid>

                <Grid item xs={12} md={6}>
                    <Typography sx={{mb:1}}>Skills: <Button variant='contained' size='small' sx={{bgcolor:'#6865ff', color:'white',":hover":{bgcolor:'#3936ea'},fontFamily:'cursive',fontWeight:'bold'}} onClick={handleAddSkill}>Add Skill</Button></Typography>
                

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
                    <Typography sx={{mb:1}}>Benefits: <Button variant='contained' size='small' sx={{bgcolor:'#6865ff', color:'white',":hover":{bgcolor:'#3936ea'},fontFamily:'cursive',fontWeight:'bold'}}  onClick={handleAddBenefit}>Add Benefit</Button></Typography>
                

                    {formData && formData.benefits.map((benefit, index) => (
                        <div key={index}>
                            <TextField

                                label={`Benefit ${index + 1}`}
                                placeholder="Benefit"
                                value={benefit}
                                onChange={(e) => handleBenefitChange(index, e.target.value)}
                                error={Boolean(errors.benefits)}
                                helperText={errors.benefits || ''}
                                required
                                fullWidth
                                variant='outlined'
                               
                            />
                            
                                <Grid item>
                                <Button variant='contained' size='small' sx={{bgcolor:'#6865ff', color:'white',":hover":{bgcolor:'#3936ea'},fontFamily:'cursive',fontWeight:'bold',mb:1}}  onClick={() => handleRemoveBenefit(index)}>Remove</Button>
                                </Grid>
                           
                        </div>
                    ))}

                    
                </Grid>

                

                

                <Grid container item xs={12} md={3}   >
                    <Button onClick={handleSubmit} size='small' variant='outlined' sx={{ m:2,bgcolor:'white', color:'#6865ff',":hover":{bgcolor:'#d5d5f5'},fontFamily:'cursive',fontWeight:'bold' }}>Submit</Button>
                    <Button onClick={handleCancel} variant='contained' size='small' sx={{bgcolor:'#6865ff', color:'white',":hover":{bgcolor:'#3936ea'},fontFamily:'cursive',fontWeight:'bold',m:2}}>Cancel</Button>
                </Grid>

            </Grid>

        </Container>
        <ToastContainer/>
        </Container>

        // <div className="job-post-form-container">
        //     <h2>Job Post Form</h2>
        //     <form >
        //         <div className="form-group">
        //             <label>Title</label>
        //             <input type="text" name="title" value={formData.title} onChange={handleChange} />
        //             {errors.title && <span className="error-message">{errors.title}</span>}
        //         </div>
        //         <div className="form-group">
        //             <label>Company</label>
        //             <input type="text" name="company" value={formData.company} onChange={handleChange} required />
        //             {errors.company && <span className="error-message">{errors.company}</span>}
        //         </div>
        //         <div className="form-group">
        //             <label>Location</label>
        //             <input type="text" name="location" value={formData.location} onChange={handleChange} required />
        //             {errors.location && <span className="error-message">{errors.location}</span>}
        //         </div>
        //         <div className="form-group">
        //             <label>Salary</label>
        //             <input type="text" name="salary" value={formData.salary} onChange={handleChange} required />
        //             {errors.salary && <span className="error-message">{errors.salary}</span>}
        //         </div>
        //         <div className="form-group">
        //             <label>Experience</label>
        //             <input type="text" name="experience" value={formData.experience} onChange={handleChange} required />
        //             {errors.experience && <span className="error-message">{errors.experience}</span>}
        //         </div>
        //         <div className="form-group">
        //             <label>Vacancy</label>
        //             <input type="text" name="vacancy" value={formData.vacancy} onChange={handleChange} required />
        //             {errors.vacancy && <span className="error-message">{errors.vacancy}</span>}
        //         </div>
        //         <div className="form-group">
        //             <label>Job Type</label>
        //             <input type="text" name="jobtype" value={formData.jobtype} onChange={handleChange} required />
        //             {errors.jobtype && <span className="error-message">{errors.jobtype}</span>}
        //         </div>
        //         <div className="form-group">
        //             <label>Description</label>
        //             <textarea name="description" value={formData.description} onChange={handleChange} required />
        //             {errors.description && <span className="error-message">{errors.description}</span>}
        //         </div>

        //         <div className="form-group">
        //             <label>Skills</label>
        // {formData && formData.skills.map((skill, index) => (
        //     <div key={index}>
        //         <input
        //             type="text"
        //             value={skill}
        //             onChange={(e) => handleSkillChange(index, e.target.value)}
        //             required
        //         />
        //         {index !== 0 && (
        //             <button type="button" onClick={() => handleRemoveSkill(index)}>Remove</button>
        //         )}

        //     </div>
        // ))}


        //             <button type="button" onClick={handleAddSkill}>Add Skill</button>
        //         </div>
        //         {errors.skills && <span className="error-message">{errors.skills}</span>}

        //         <div className="form-group">
        //             <label>Benefits</label>
        //             {formData && formData.benefits.map((benefit, index) => (
        //                 <div key={index}>
        //                     <input
        //                         type="text"
        //                         value={benefit}
        //                         onChange={(e) => handleBenefitChange(index, e.target.value)}
        //                         required
        //                     />
        //                     {index !== 0 && (
        //                         <button type="button" onClick={() => handleRemoveBenefit(index)}>Remove</button>
        //                     )}

        //                 </div>
        //             ))}
        //             {errors.benefits && <span className="error-message">{errors.benefits}</span>}
        //             <button type="button" onClick={handleAddBenefit}>Add Benefit</button>
        //         </div>

        //         <div className="form-group">
        //             <label>Education</label>
        //             <input type="text" name="education" value={formData.education} onChange={handleChange} required />
        //             {errors.education && <span className="error-message">{errors.education}</span>}
        //         </div>

        //         <div className="form-group">
        //             <label>Deadline</label>
        //             <input type="date" name="deadline" value={formData.deadline} onChange={handleChange} required />
        //             {errors.deadline && <span className="error-message">{errors.deadline}</span>}
        //         </div>

        //         <div className="form-group">
        //             <label>About the company</label>
        //             <input type="text" name="aboutthecompany" value={formData.aboutthecompany} onChange={handleChange} required />
        //             {errors.aboutthecompany && <span className="error-message">{errors.aboutthecompany}</span>}
        //         </div>
        //         <div className="form-group">
        //             <button type="button" onClick={handleSubmit}>Submit</button>
        //             <button type="button" onClick={handleCancel}>Cancel</button>
        //         </div>
        //     </form>
        // </div>
    );
};

export default JobPostForm;
