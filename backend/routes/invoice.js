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

router.post('/', async(req, res) => {
    const { customer_name,customer_mobile, customer_address,invoiced_by,products,date,total_amount } = req.body;

    const productsJson = JSON.stringify(products);
    
    // Insert user into the database
    database.pool.getConnection((err,connection)=>{
        if(err) throw err
        

        const query = 'INSERT INTO invoices (customer_name, customer_mobile, customer_address, invoiced_by, products, date, total_amount) VALUES (?, ?, ?, ?, ?, ?, ?)';
        connection.query(query, [customer_name,customer_mobile, customer_address, invoiced_by,productsJson,date,total_amount],(err,result)=>{
            connection.release()// return the connection to pool

            if(!err){
                res.status(201).json({ message: 'Invoice inserted successfully.' });
            }
            else{
                console.error('Error inserting invouce:', err.sqlMessage);
                return res.status(500).json({ error: 'Internal server error.' ,sql:err.sqlMessage});
            }
        })
    })

    
});

router.get('/', verifyToken, (req, res) => {
    const query = 'SELECT * FROM invoices WHERE invoiced_by = ?';
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

});

 



module.exports = router;