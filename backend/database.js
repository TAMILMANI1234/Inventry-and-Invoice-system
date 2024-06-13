const mysql = require('mysql');   //import the mysql packages
//Mysql coonnection
const pool =mysql.createPool({    //for creating a Pool of connection
    connectionLimit :10,          //max limit of connection
    host            :'localhost', //host name of DB
    user            :'root',      //username of DB
    password        :'',          //Password of DB
    database        :'ssi'        //Database for the application
});
module.exports = {pool}           //Export the db connection



