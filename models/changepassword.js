const mongoose = require('mongoose')
var cloudinary = require('cloudinary').v2;

cloudinary.config({ 
    cloud_name: 'dc0gwhni7', 
    api_key: '634834669551983', 
    api_secret: 'JDoQnFwslhFE5g_FwFpIn30XQBk',
   // secure: true
  });

const ChangepasswordSchema = new mongoose.Schema({
  

    oldpassword:{
        type:String,
        required:true
    },

    newpassword:{
        type:String,
        required:true
    },
    
    password:{
        type:String,
        required:true
    },
    
    image:{
        public_id:{
            type:String
        },
        url:{
                type:String
        }
    }
},{timestamps:true})

    const Changepassword = mongoose.model('changepassword',ChangepasswordSchema)

    module.exports =Changepassword