const mongoose= require('mongoose');
 
//connect to the database
main().catch(err => console.log(err)); //from documentation geting started
async function main() {
  await mongoose.connect('mongodb://localhost/contact_list_db');
  
  // use `await mongoose.connect('mongodb://user:password@localhost:27017/test');` if your database has auth enabled
}


//acquire the connection(to check if it's successful)
const db = mongoose.connection;

//error
db.on('error', function(err) { console.log(err.message); });

//up and running then print the message
db.once('open', function() {
  
    console.log("Successfully connected to the database");

});