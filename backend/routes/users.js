const express =require('express');
require('dotenv').config(); // config env
const database = require('../database');
const router = express.Router();
const jwt = require('jsonwebtoken');

const jwtSecret = process.env.jwtSecret;   

// Middleware to verify JWT token
const verifyToken = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) {
        return res.status(403).json({ error: 'No token provided.' });
    }

    jwt.verify(token, jwtSecret, (err, decoded) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to authenticate token.' });
        }
        // Save the decoded info for use in other routes
        req.username = decoded.username;
        next();
    });
};

router.get('/:username', verifyToken, (req, res) => {
    const username = req.params.username;
    const query = 'SELECT * FROM users WHERE username = ?';
    
    database.pool.getConnection((err,connection)=>{
        if(err) throw err 
        connection.query(query, [req.username],(err,result)=>{
            connection.release()// return the connection to pool

            if(!err){
                res.status(200).json(result);
            }
            else{
                console.error('Error inserting user:', err.sqlMessage);
                return res.status(500).json({ error: 'Internal server error.' ,sql:err.sqlMessage});
            }
        })
    })
})

module.exports = router;