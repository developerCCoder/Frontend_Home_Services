import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from "react-router-dom";
import FormContextProvider from './Pages/Context/FormContext';
import { AuthProvider } from './Pages/Context/AuthContext';
import {HomeServicesContextProvider} from './Pages/Context/ServicesContext'


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

  <BrowserRouter>
  <HomeServicesContextProvider>
  <FormContextProvider>
    <AuthProvider>
    <App />
    </AuthProvider>
   </FormContextProvider>
   </HomeServicesContextProvider>
  </BrowserRouter>
);


