import React, { useState, useEffect } from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

import { Alert, Card, CardMedia, CardContent, CardActions, Button, TextField, Dialog, DialogTitle, DialogContent, DialogActions, Snackbar, MenuItem, Link } from '@mui/material';
import axios from "axios";
import DeleteIcon from '@mui/icons-material/Delete';
import EditNoteIcon from '@mui/icons-material/EditNote';
import AddIcon from '@mui/icons-material/Add';

const EditServices = () => {

  const categories = ['Maintenance', 'Remodelling', 'Appliances', 'Events', 'Personal'];

  const initialServiceForm = {
    title: '',
    description: '',
    image: '',
    rating: '',
    range: '',
    summary: '',
    category: '',
  };

  const [services, setServices] = useState([]);
  const [editingService, setEditingService] = useState(null);
  const [serviceForm, setServiceForm] = useState(initialServiceForm);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);
const [alertMessage, setAlertMessage] = useState('');
const [error, setError] = useState('');
const [searchInput, setSearchInput] = useState('');
const [filteredServices, setFilteredServices] = useState([]);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const response = await axios.get('https://lazy-ruby-shawl.cyclic.app/homeservices')
      setServices(response.data);
      setFilteredServices(response.data);
    } catch (error) {
      console.error(error);
    }
   
  };

  const handleEdit = (service) => {
    setEditingService(service);
    setServiceForm(service);
    setDialogOpen(true);
  };


  const handleInputChange = (event) => {
    setServiceForm((prevServiceForm) => ({
      ...prevServiceForm,
      [event.target.name]: event.target.value,
      category: event.target.name === 'category' ? event.target.value : prevServiceForm.category,
    }));
  };


  


  const handleAddNewService = () => {
    setDialogOpen(true);
  };

  const handleAddService = async () => {
    const existingService = services.find(
      (service) => service.title.toLowerCase() === serviceForm.title.toLowerCase()
    );
  
    if (existingService) {
      setError('Service already exists!');
      return;
    }
    try {
      await axios.post('https://lazy-ruby-shawl.cyclic.app/homeservices', serviceForm);
      
    } catch (error) {
      console.error(error);
    }

     fetchServices();
      setServiceForm(initialServiceForm);
      setDialogOpen(false);
      setOpenSnackbar(true);
      setAlertMessage('New service added successfully!');
    setAlertOpen(true);
    
  };


  const handleUpdate = async () => {
    const updatedService = {
      id: editingService.id,
      ...serviceForm,
    };

    try {
      await axios.put(`https://lazy-ruby-shawl.cyclic.app/homeservices/${editingService.id}`, updatedService);  
      
    } catch (error) {
      console.error(error);
    }

    fetchServices();
    setEditingService(null);
      setServiceForm(initialServiceForm);
      setDialogOpen(false);
      setAlertMessage('Service updated successfully!');
    setAlertOpen(true);
  };

  const handleDelete = async (service) => {
    try {
      await axios.delete(`https://lazy-ruby-shawl.cyclic.app/homeservices/${service.id}`)
      
    } catch (error) {
      console.error(error);
    }

    fetchServices();
    setAlertMessage('Service deleted successfully!');
    setAlertOpen(true);
  };

 


 
 

  const handleCancel = () => {
    setEditingService(null);
    setServiceForm(initialServiceForm);
    setDialogOpen(false);
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
    setError('');
  };


  useEffect(() => {
    let filteredData = services;

    // Filter by search input
    if (searchInput) {
      filteredData = filteredData.filter((service) =>
        service.title.toLowerCase().includes(searchInput.toLowerCase())
      );
    }
  
  
  
    setFilteredServices(filteredData);
  }, [services, searchInput]);
  

  return (
    <Box backgroundColor={'#f1f5fd'} pt={'100px'} >


      <Box  columnGap={'30px'}  maxWidth={{xs:'95%',md:'85%'}}  mt={'20px'} margin={'auto'}>
      <Link href="/admin" color="inherit" underline="none"> <Button sx={{
                display: "block",
                
                width: "10rem",
              mb:"30px",
                color: "#343f52",
                borderRadius: "0.625rem",
                padding: "10px",
                fontSize: "1rem",
                textTransform: "capitalize",
                fontWeight: "500",
                boxSizing: "border-box",
                background: "#C1FF72",
                transition: "all 300ms ease 0s",
                ":hover":{background: "#9acc5b"}
              }} size={'large'} variant="contained"  >
           Admin page
          </Button> </Link>

          <Box 
  display="flex"
  flexDirection="row"
  alignItems="center"
  justifyContent="space-between"
  marginBottom="1rem"
>
  <TextField
  sx={{bgcolor:'#fff'}}
    label="Search"
    placeholder='Search service'
    value={searchInput}
    onChange={(e) => setSearchInput(e.target.value)}
    margin="dense"
  />

</Box>
      </Box>
      

    <Box  maxWidth={{xs:'95%',md:'85%'}}  margin={'auto'} pb={'6rem'}>
    
    
        <Box display={'grid'} gridTemplateColumns={{xs:'1fr 1fr',md:'1fr 1fr 1fr 1fr'}} gap={'20px'}>
        {filteredServices.map((service)=>{
            return (

         <Card sx={{cursor:'pointer' }}>
      
        <CardMedia
          component="img"
          height="200"
          image={service.image}
          alt="green iguana"
        />
        <CardContent sx={{textAlign:'left',padding:'15px', pb:'15px'}}>
          <Typography color={'#11151e'} fontSize={'16px'} mb={'5px'}  >
            {service.title}
          </Typography>
          <Typography color={'#3f78e0'} fontSize={'18px'} fontWeight={500}>
        {service.range}
        </Typography>
          
        </CardContent>
        <CardActions>
                <Button startIcon={<EditNoteIcon />} variant="contained" color="primary" onClick={() => handleEdit(service)}>Edit</Button>
                <Button startIcon={<DeleteIcon />} variant="contained" sx={{bgcolor:'#fe6464',":hover":{bgcolor:'#e45a5a'}}} onClick={() => handleDelete(service)}>Delete</Button>
              </CardActions>
      
      
    </Card>

    

            )
        })}
    
    
    </Box>
        

    </Box>


    <Dialog open={dialogOpen} onClose={handleCancel}>
        <DialogTitle>{editingService ? 'Edit Service' : 'Add New Service'}</DialogTitle>
        <DialogContent>
          <TextField label="Title" name="title" value={serviceForm.title} onChange={handleInputChange} fullWidth margin="normal" />

          <TextField label="Description" name="description" value={serviceForm.description} onChange={handleInputChange} fullWidth margin="normal" />


          <TextField type='url' label="Image" name="image" value={serviceForm.image} onChange={handleInputChange} fullWidth margin="normal" />

          <TextField
            select
            label="Category"
            name="category"
            value={serviceForm.category}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          >
            {categories.map((category) => (
              <MenuItem key={category} value={category}>
                {category}
              </MenuItem>
            ))}
          </TextField>

          <TextField label="Rating" name="rating" value={serviceForm.rating} onChange={handleInputChange} fullWidth margin="normal" />

          <TextField label="Price Range" name="range" value={serviceForm.range} onChange={handleInputChange} fullWidth margin="normal" />

          <TextField label="Summary" name="summary" value={serviceForm.summary} onChange={handleInputChange} fullWidth margin="normal" />

        </DialogContent>
        <DialogActions>
        <Button  sx={{background: "#C1FF72",color: "#343f52",
                transition: "all 300ms ease 0s",
                ":hover":{background: "#9acc5b"}
              }} variant="contained" onClick={handleCancel}>
            Cancel
          </Button>
          <Button variant="contained" sx={{background: "#C1FF72",color: "#343f52",
                transition: "all 300ms ease 0s",
                ":hover":{background: "#9acc5b"}
              }} onClick={editingService ? handleUpdate : handleAddService}>
            {editingService ? 'Save' : 'Add'}
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar open={alertOpen} autoHideDuration={3000} onClose={() => setAlertOpen(false)}>
  <Alert onClose={() => setAlertOpen(false)} severity="success">
    {alertMessage}
  </Alert>
</Snackbar>

<Snackbar open={!!error} autoHideDuration={3000} onClose={() => setError('')}>
  <Alert onClose={() => setError('')} severity="error" sx={{ width: '100%' }}>
    {error}
  </Alert>
</Snackbar>

      
       <Button  startIcon={<AddIcon fontSize='18px'/>} sx={{
        
        position:'fixed',
        top:"165px",
        right:'20px',
        
        color: "#343f52",
        borderRadius: "0.625rem",
        padding: "10px",
        fontSize: "1rem",
        textTransform: "capitalize",
        fontWeight: "500",
        boxSizing: "border-box",
        background: "#C1FF72",
        transition: "all 300ms ease 0s",
        ":hover":{background: "#9acc5b"}
      }} size={'large'} variant="contained" onClick={handleAddNewService}   >
   Add New Service
  </Button>
       
      
        
      


     
    </Box>
  )
}

export default EditServices