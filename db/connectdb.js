const mongoose  =require('mongoose')
// const url = "mongodb://127.0.0.1:27017/AdmissionPortal"
const live_Url = "mongodb+srv://raghuvanshiritik537:raghuwanshi123@cluster0.8gz1tus.mongodb.net/admissionproject?retryWrites=true&w=majority"

const connectdb =()=>{
    return mongoose.connect(live_Url)



    .then(()=>{
        console.log('Database connected..')
    })
    .catch((error)=>{
        console.log(error)
    })
}

module.exports =connectdb
