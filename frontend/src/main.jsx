import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { Provider } from 'react-redux';
import { store } from './ssiapi/Stores.jsx';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './components/LoginComponent/login.jsx';
import Register from './components/RegisterComponent/register.jsx';
import Home from './components/HomeComponent/home.jsx';
import Updateproduct from './components/UpdateComponent/updateproduct.jsx';
import Addproduct from './components/AddproductComponent/addproduct.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
        <BrowserRouter>
            <Routes>
                <Route path="/" index element={<App />}></Route>
                <Route path='/signup' element={ <Register/> }/>
                <Route path="/home" element={<Home />} /> 
                <Route path="/updateproduct/:productid" element={<Updateproduct />} /> 
                <Route path="/addproduct" element={<Addproduct />} /> 
            </Routes> 
         </BrowserRouter>
    </Provider>
  </React.StrictMode>,
)
