const mongoose  =require('mongoose')
// const url = "mongodb://127.0.0.1:27017/AdmissionPortal"
const live_Url =""


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
