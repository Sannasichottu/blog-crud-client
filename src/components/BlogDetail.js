import React, { useEffect, useState } from 'react';
import { useParams, useNavigate} from 'react-router-dom';
import axios from 'axios';
import { Box, Button, InputLabel, TextField, Typography } from '@mui/material';

const lableStyles = {mb:1,mt:2,fontSize:'24px',fontWeight:'bold'};
const BlogDetail = () => {
  const navigate = useNavigate();
  const [blog, setBlog] = useState();
  const id = useParams().id;
  console.log(id);

  const [inputs, setInputs] = useState({
    
  });

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]:e.target.value,
    }));
  };

  const fetchDetails = async () => {
    const res = await axios.get(`http://localhost:5000/api/blog/${id}`)
      .catch(err => console.log(err));
    const data = await res.data;
    return data;
  }
  useEffect(() => {
    fetchDetails().then((data) => {
      setBlog(data.blog);
    setInputs({
      title:data.blog.title,
      description: data.blog.description,
    });
  });
  }, [id]);
  const sendRequest = async () => {
    const res = await axios.put(`http://localhost:5000/api/blog/update/${id}`,{
      title:inputs.title,
      description:inputs.description
    }).catch((err)=>console.log(err));

    const data = await res.data;
    return data
  }
  console.log(blog);

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(inputs);
    sendRequest().then(data=>console.log(data)).then(()=>navigate("/myBlogs/"));
  }

  return (
    <div>
      {inputs && 
      
      <form onSubmit={handleSubmit} >
        <Box border={3} borderColor="red" borderRadius={10}
          boxShadow="10px 10px 20px #ccc" padding={3} margin={'auto'} marginTop={5} display='flex' flexDirection={'column'} width={'80%'} >
          <Typography fontWeight={'bold'} padding={3} color='grey' variant='h3' textAlign={'center'}
          >Post Your Blog</Typography>
          <InputLabel sx={lableStyles} >
            Title</InputLabel>
          <TextField name="title" onChange={handleChange} value={inputs.title} margin='auto' variant='outlined' placeholder='Enter Your Name' />
          <InputLabel sx={lableStyles} >Description</InputLabel>
          <TextField name="description" onChange={handleChange} value={inputs.description} margin='auto' variant='outlined' placeholder='Enter Your Description' />
          <Button sx={{ mt: 2, borderRadius: 4 }} variant="contained" color="warning" type="submit">Submit</Button>
        </Box>
      </form> 
      }
    </div>
  )
}

export default BlogDetail