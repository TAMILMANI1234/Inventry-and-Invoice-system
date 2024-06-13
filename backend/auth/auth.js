const express = require('express');
require('dotenv').config(); // config env
const database =require("../database");   //import the DB
const bcrypt = require('bcrypt');         // Package for Encrypt the user's passwords
const jwt = require('jsonwebtoken');      //To provide secure connection between API and frontend

const router = express.Router();          //Router from express
const jwtSecret = process.env.jwtSecret;            //provide secrete to generate JWT
const saltRounds = 10;

//registration route
router.post('/register', async(req, res) => {
    const { companyname, email, username, password } = req.body;
   
    // Validate input
    if (!companyname || !email || !username  || !password) {
        return res.status(400).json({ error: 'Please provide all required fields.' });
    }
    
    //Hashing the user password 
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Insert user into the database
    database.pool.getConnection((err,connection)=>{
        if(err) throw err 
        const query = 'INSERT INTO users (company_name, email, username, password) VALUES (?, ?, ?, ?)';
        connection.query(query, [companyname, email, username, hashedPassword],(err,result)=>{
            connection.release()// return the connection to pool

            if(!err){
                res.status(201).json({ message: 'User registered successfully.' });
            }
            else{
                console.error('Error inserting user:', err.sqlMessage);
                return res.status(500).json({ error: 'Internal server error.' ,sql:err.sqlMessage});
            }
        })
    })
});

//Login route

router.post('/login',(req,res)=>{
    const { username, password } = req.body;
   
    // Validate input
    if (!username || !password) {
        return res.status(400).json({ error: 'Please provide all required fields.' });
    }
    // Login functionality
    database.pool.getConnection((err,connection)=>{
        if(err) throw err 

        const query = 'SELECT * FROM users WHERE username = ?';
        connection.query(query, [username],async (err,result)=>{
        connection.release()// return the connection to pool

            if(!err){
                if (result.length === 0) {
                    return res.status(400).json({ error: 'Invalid username or password.' });
                }
                const user = result[0];

                 // Compare the password
                const match = await bcrypt.compare(password, user.password);
                if (!match) {
                    return res.status(400).json({ error: 'Invalid username or password.' });
                }
                // Generate JWT Token
                const token = jwt.sign(
                    { id: user.id, username: user.username }, 
                    jwtSecret, 
                    { expiresIn: '10h' }
                );

                res.status(200).json({ message: 'Login successful', token });

            }
            else{
                console.error('Error inserting user:', err.sqlMessage);
                return res.status(500).json({ error: 'Internal server error.' });
            }
        })
    })
})
module.exports = router;