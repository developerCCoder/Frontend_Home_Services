import { Box, Divider,createTheme, ThemeProvider, TextField, Typography,Button, Autocomplete } from '@mui/material'
import React,{useState,useContext} from 'react';
import { useParams } from "react-router-dom";

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';


import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import axios from 'axios';
import { StaticDateTimePicker } from '@mui/x-date-pickers/StaticDateTimePicker';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';

import { orange } from '@mui/material/colors';

import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { AuthContext } from '../Context/AuthContext';



dayjs.extend(customParseFormat);
dayjs.extend(isSameOrBefore);
dayjs.extend(isSameOrAfter);




const SelectDate = () => {

    const [selectedDateTime, setSelectedDateTime] = useState(null);
    const { user } = useContext(AuthContext);
    const params = useParams();
    const searchQuery = params.name


    const theme = createTheme({
      palette: {
        primary: {
          main: '#ff914d',
        },
      },
    });
    const today = dayjs();
  const maxDate = today.add(2, 'month');
  
    const handleDateTimeChange = (date) => {
      setSelectedDateTime(date);
    };


    const navigate = useNavigate();

      const disablePastDates = (date) => {
        return dayjs(date).isSameOrBefore(today, 'minute');
      };
    
      const disableFutureDates = (date) => {
        return dayjs(date).isSameOrAfter(maxDate, 'minute');
      };
      const disableMonthsAfter = (date) => {
        const selectedMonth = dayjs(date).month();
        const maxMonth = maxDate.month();
        return selectedMonth > maxMonth;
      };

      const currentDate = new Date();


      

      const handleFormSubmit = () => {
        const existingFormData = JSON.parse(localStorage.getItem('serviceRequested'));
        // Update the existing form data with the selected datetime
      const updatedFormData = {
        ...existingFormData,
        selectedDateTime,'user':user.data,
      };
  
      // Save the updated form data in localStorage
      localStorage.setItem('serviceRequested', JSON.stringify(updatedFormData));
          axios
            .post("http://54.90.98.169/service-details", {
              date: selectedDateTime,
            })
            .then((response) => {
              console.log(response.data);
            })
            .catch((error) => {
              console.error(error);
            });
    
          // console.log('Selected Date:', selectedDateTime.$d);
    navigate('/placeorder')
    
            
      };
    

      

 

  const minTime = new Date();
  minTime.setHours(8, 0, 0); // Minimum time: 8:00 AM

  const maxTime = new Date();
  maxTime.setHours(18, 0, 0); // Maximum time: 6:00 PM

  return (
  
        
<Box height={'60vh'}  pt={'70px'} width={'95%'} margin={'auto'}>
  

  <ThemeProvider theme={theme}>

<LocalizationProvider dateAdapter={AdapterDayjs}>
      
      <Box  >
    
    <StaticDateTimePicker  disablePast label="Select Date and Time"
            value={selectedDateTime}
            onChange={handleDateTimeChange}
        //     minDateTime={minTime}
        // maxDateTime={maxTime}
            renderInput={(params) => <TextField {...params} />}   shouldDisableTime={disablePastDates}
            shouldDisableFutureDate={disableFutureDates}
            shouldDisableFutureTime={disableFutureDates} shouldDisableMonth={disableMonthsAfter}  />
       

       
    
    </Box>
    </LocalizationProvider>
    </ThemeProvider>

 

    
  <Box  display={'flex'} alignItems={'center'} width={'100%'} margin={'auto'} pb={'80px'} >

<Button  onClick={handleFormSubmit}  variant="contained" sx={{width:'100%',display:{md:'none'}}}>Next</Button>
</Box>
    

</Box>



      

       


  )
}

export default SelectDate