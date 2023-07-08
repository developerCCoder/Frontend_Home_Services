
import './App.css';
import { Box, Typography } from '@mui/material';
import Home from './Pages/Home/Home';
import Navbar from './Pages/Navbar/Navbar';
import Footer from './Pages/Footer/Footer'
import Allroutes from './Allroutes/Allroutes';

function App() {
  return (
  <Box>
    <Navbar/>
    <Allroutes/>
    {/* <Footer/> */}
  </Box>
    
  );
}

export default App;
