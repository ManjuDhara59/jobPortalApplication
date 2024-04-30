import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { Box, Button, Divider, Grid, Input } from '@mui/joy';
import { Container, FormControl, InputLabel, MenuItem, Select, Typography } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import SearchIcon from '@mui/icons-material/Search';

const SearchBar = ({ handleSearchClick, userRole, searchBarData }) => {

  const { userId } = useParams();
  const navigate = useNavigate();
  const pathlocation = useLocation();
  
  const keywordOptions = ['Software Engineer', 'Data Analyst', 'Marketing Manager'];
  const locationOptions = ['Hyderabad', 'Mumbai', 'Vizag'];
  const jobTypeOptions = ['Full-time', 'Part-time', 'Remote'];
  const experienceOptions = ['2 years', '5 years', '7 years'];
  const skillsOptions = ['JavaScript', 'Python', 'React.js'];
  

  const [keyword, setKeyword] = useState('');
  const [location, setLocation] = useState('');
  const [jobtype, setJobtype] = useState('');
  const [experience, setExperience] = useState('');
  const [skills, setSkills] = useState('');
  const [salary, setSalary] = useState('');
  const [typedValue, setTypedValue] = useState('');
  const [postlimit, setPostlimit] = useState(false);
  const [postlimitError, setPostlimitError] = useState('');

  console.log(location);

  const handleSearchButton = () => {
  
    const searchData = {
      keyword: keyword,
      location: location,
      jobtype: jobtype,
      experience: experience,
      skills: skills,
      salary: salary,
      typedValue: typedValue
    };
   
    handleSearchClick(searchData);
  };

  const handleClearButton = () => {
   
    setKeyword('');
    setLocation('');
    setJobtype('');
    setExperience('');
    setSkills('');
    setSalary('');
    setTypedValue('');
   
    handleSearchClick({
      keyword: '',
      location: '',
      jobtype: '',
      experience: '',
      skills: '',
      salary: '',
      typedValue: ''
    });
  };

  useEffect(() => {

    if (searchBarData) {
      setLocation(searchBarData.location);
      setJobtype(searchBarData.jobtype);
      setExperience(searchBarData.experience);
      setSkills(searchBarData.skills);
      setTypedValue(searchBarData.typedValue);
    }

  }, [pathlocation.pathname]);


  useEffect(() => {

    const handlePostJob = () => {
      if (postlimit && userRole === 'employer') {
        navigate(`/${userId}/job-post-form`);
        setPostlimitError('');
      }
    };
    handlePostJob();

  }, [postlimit, userRole]);


  const handlePostLimit = async () => {

    try {
      const response = await axios.get(`http://localhost:8080/job/getPostEligibility/${userId}`);
      console.log(typeof response.data, response.data);
      setPostlimit(response.data);
      if (response.data) {
        setPostlimitError('');
      } else {
        setPostlimitError('Upgrade your plan to make a new job post');
      }

    } catch (error) {
      console.error('Error fetching post limit:', error);
    }
  };

  return (

    <Container component="main" maxWidth='md'
      sx={{
        marginTop: 4,
        marginBottom: 4,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        py: 2,
        bgcolor: '#F1F1FF',
        gap: 2,
        borderRadius: 5,
       
        
      }}
    >



      <Grid container item xs={12} md={10} >
        <Input
          placeholder="Search Jobs..."
          name="typedValue"
          value={typedValue}
          onChange={(e) => setTypedValue(e.target.value)}
          endDecorator={
            <>
              <Button variant="outlined"  sx={{ px: 1, py: 1, mx: 1,bgcolor:'#F6F6FF',color:'#6865ff ',fontWeight:'bold' }} onClick={handleClearButton} startDecorator={<ClearIcon />}>
                Clear
              </Button>
              <Divider orientation='vertical' sx={{ my: 1 }} />
              <Button variant='solid' size="md" sx={{ px: 2,py:1.5, mx: 1,bgcolor:'#6865ff' }} startDecorator={<SearchIcon />} onClick={handleSearchButton}>
                Search
              </Button>
            </>
          }

          sx={{ width: '100%', height: 70,border: 2, borderColor: '#6865FF' }}
        />
      </Grid>

      <Grid container rowSpacing={2} xs={12} columnSpacing={2} justifyContent='flex-start'>

        <Grid container item md={10} justifyContent='flex-end'>
          
          <Grid item xs={4} md={3} >

            <FormControl  sx={{ m: 1, minWidth: 120 }} size="small">

            <InputLabel id="location-label">Location</InputLabel>

              <Select
              labelId="location-label"
                id="location"
                value={location}
                label="Location"
                variant='outlined'

                onChange={(e) => setLocation(e.target.value)}
                sx={{  borderRadius: '26px',border:2, borderColor:'#6865ff',bgcolor:'#ffffff' }}

              >
                {locationOptions.map((option, index) => (
                  <MenuItem key={index} value={option} >{option}</MenuItem>

                ))}
              </Select>

            </FormControl>
          </Grid>

         

          <Grid item xs={4} md={3} >
            <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
            <InputLabel id="skills-label">Skill</InputLabel>
              <Select
                labelId="skills-label"
                id="skills"
                value={skills}
                label="Skill"
                variant='outlined'
                sx={{  borderRadius: '26px',border:2, borderColor:'#6865ff',bgcolor:'#ffffff' }}
                onChange={(e) => setSkills(e.target.value)}
              >
                {skillsOptions.map((option, index) => (
                  <MenuItem key={index} value={option}>{option}</MenuItem>

                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={4} md={3} >
            <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
            <InputLabel id="role-label">Job Role</InputLabel>
              <Select
                labelId="role-label"
                id="role"
                value={keyword}
                label="Job Role"
                variant='outlined'
                sx={{  borderRadius: '26px',border:2, borderColor:'#6865ff',bgcolor:'#ffffff' }}
                onChange={(e) => setKeyword(e.target.value)}
              >
                {keywordOptions.map((option, index) => (
                  <MenuItem key={index} value={option}>{option}</MenuItem>

                ))}
              </Select>
            </FormControl>
          </Grid>

        </Grid>


        <Grid container item md={9} justifyContent='flex-end'>

          

          <Grid item xs={4} md={4}>
            <FormControl sx={{ m: 1, minWidth: 130 }} size="small">
            <InputLabel id="jobtype-label">Job Type</InputLabel>
              <Select
              labelId='jobtype-label'
                variant='outlined'
                id="jobtype"
                value={jobtype}
                label="Job Type"
                sx={{borderRadius: '26px',border:2, borderColor:'#6865ff',bgcolor:'#ffffff' }}
                onChange={(e) => setJobtype(e.target.value)}
              >
                {jobTypeOptions.map((option, index) => (
                  <MenuItem key={index} value={option}>{option}</MenuItem>

                ))}
              </Select>
            </FormControl>
          </Grid>

         

          <Grid item xs={4} md={3} >
            <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
            <InputLabel id="experience-label">Experience</InputLabel>
              <Select
              labelId='experience-label'
                variant='outlined'
                id="experience"
                value={experience}
                label="Experience"
                sx={{ borderRadius: '26px',border:2, borderColor:'#6865ff',bgcolor:'#ffffff' }}
                onChange={(e) => setExperience(e.target.value)}
              >
                {experienceOptions.map((option, index) => (
                  <MenuItem key={index} value={option}>{option}</MenuItem>

                ))}
              </Select>
            </FormControl>
          </Grid>

        </Grid>

      </Grid>

    </Container>

   


  );
};

export default SearchBar;
