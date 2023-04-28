const mongoose = require('mongoose')

//define schema
const CourseFormSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    mobileNo: {
        type: Number,
        required: true
    },
     dob: {
        type: Date,
         required: true
     },
     gender: {
         type: String,
         required: true
     },
     address: {
         type: String,
         required:true
     },
     college: {
         type: String,
         required:true
     },
    course: {
        type: String,
        required:true
    },
    branch: {
        type: String,
        required:true
    },
    user_id: {
        type: String,
        require:true
    },
    status: {
        type: String,
        default:"pendding"
    },
    comment: {
        type: String,
        default:"pendding"
    },

   

}, { timestamps: true })


const CourseFormModel = mongoose.model('CourseForm',CourseFormSchema)

module.exports = CourseFormModel