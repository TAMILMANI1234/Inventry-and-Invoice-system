// importing the required pakages
const express =require('express');
const bodyParser =require ('body-parser');
const cors = require('cors');
require('dotenv').config(); // config env
//import the  routes of the application 
const authrouter=require('./auth/auth')
const productroute=require('./routes/products');
const invoiceroute=require('./routes/invoice');
const usersroute=require('./routes/users');

//To execute the HTTP verbs ny calling express
const app= express();

//specify the port to run application
const port =process.env.PORT  ||5000;
 
//use the body parser to precess the URL
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

// Middleware to enable CORS for cross platform 
app.use(cors());
 
//auth route
app.use('/auth',authrouter);

//product route
app.use('/products',productroute);

//invoice route
app.use('/invoice',invoiceroute);

//user route
app.use('/user',usersroute);

//Finally bind application to specified port number
app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
})
