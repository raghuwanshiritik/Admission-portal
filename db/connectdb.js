const mongoose  =require('mongoose')
// const url = "mongodb://127.0.0.1:27017/AdmissionPortal"
const live_Url ="mongodb+srv://raghuvanshiritik537:ritikraghuwanshi@cluster0.w44ru4u.mongodb.net/admissionportal?retryWrites=true&w=majority"


const connectdb =()=>{
    return mongoose.connect(live_Url )



    .then(()=>{
        console.log('Database connected..')
    })
    .catch((error)=>{
        console.log(error)
    })
}

module.exports =connectdb
