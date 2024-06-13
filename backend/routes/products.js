const express =require('express');
require('dotenv').config(); 
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

//get products
router.get('/',verifyToken, (req, res) => {
    const query = 'SELECT * FROM products WHERE username = ?';
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


//get by ID
router.get('/:id', verifyToken, (req, res) => {
    const productId = req.params.id;
    const query = 'SELECT * FROM products WHERE username = ? AND product_id=?';
    
    database.pool.getConnection((err,connection)=>{
        if(err) throw err 
        connection.query(query, [req.username,productId],(err,result)=>{
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

//Update by product ID
router.put('/:productid', verifyToken, (req, res) => {
    const productId = req.params.productid;
    const { product_name,description,quantity,price, stock_location } = req.body;
    const query ='UPDATE products SET product_name=?,description=?,quantity=?,price=?,stock_location=? WHERE product_id=?';
    database.pool.getConnection((err,connection)=>{
        if(err) throw err 
        connection.query(query, [product_name,description,quantity,price,stock_location,productId],(err,result)=>{
            connection.release()// return the connection to pool

            if(!err){
                res.status(200).json({ message: 'Product updated successfully.' });
            }
            else{
                console.error('Error updating product:', error);
                return res.status(500).json({ error: 'Internal server error.' });
            }
        })
    })
  });

//delete product
router.delete('/:id', verifyToken, (req, res) => {
    const productID = req.params.id;
    const query = 'DELETE FROM `products` WHERE product_id = ?';
    console.log("deleted works")
    database.pool.getConnection((err,connection)=>{
        if(err) throw err 
        connection.query(query, [productID],(err,result)=>{
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

//insert a product
router.post('/', async(req, res) => {
    const { username,product_name, description, quantity,price,stock_location } = req.body; 
    // Insert user into the database
    database.pool.getConnection((err,connection)=>{
        if(err) throw err 

        const query = 'INSERT INTO products(username,product_name,description,quantity, price,stock_location) VALUES (?, ?, ?, ?, ?, ?)';
        connection.query(query, [username,product_name, description, quantity,price,stock_location],(err,result)=>{
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


module.exports = router;