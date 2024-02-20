var mysql = require('mysql');
var connection = mysql.createConnection({
    user:"root",
    host:"localhost",
    password:"",
    port:3306,
    database:"nodetask"

})
connection.connect(function(err){
    if(err){
        console.log("Error occured....", err.sqlMessage);
    }
    else{
        console.log("Connection Established.....");
    }
})
module.exports = connection;