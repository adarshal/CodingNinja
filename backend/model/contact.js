const mongoose = require('mongoose');

const ContactSchema = new mongoose.Schema({
    name: {
     type: String,
     required:true
    },
    phone: {
    type: String,
    required: true
    }
  });

  const Contact=mongoose.model('Contact',ContactSchema);
//This is coolectiom=n, collection contain docs,docs contains field like name,phone. collectn name start capital
module.exports =Contact;

