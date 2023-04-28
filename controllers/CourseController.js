const  CourseFormModel = require('../models/Course') 
const UserModel = require('../models/user')
const jwt = require('jsonwebtoken')



class CourseController{
    
static BtechForm = async (req, res)=>{
    try{
        const {userName,image, _id, email } = req.user
        res.render('btechform',{name:userName, i:image, e:email})
    }catch(error){
        console.log(error)
    }
}
static BtechFormInsert = async (req, res)=>{
    try{
       //console.log( req.body)
       const { _id } = req.user
       const {userName, email, mobileNo, dob, gender, address, college, course, branch} = req.body
       const insert = await CourseFormModel({
        userName: userName,
        email: email,
        mobileNo: mobileNo,
         dob: dob,
         gender: gender,
         address: address,
         college: college,
        course: course,
        branch: branch,
        user_id: _id,
        
    })
    await insert.save()
    res.redirect('/btechFormDisplay')

    }catch(error){
        console.log(error)
    }
}
static BtechFormDisplay = async (req, res)=>{
    try{
        const {userName,image, _id, email } = req.user
        const display = await CourseFormModel.find({user_id:_id})

        res.render('btechformdisplay',{Btech:display,name:userName, i:image, e:email})

    }catch(error){
        console.log(error)
    }
}
static BtechFormView = async (req, res)=>{
    try{
        const {userName,image, _id, email } = req.user
        const result = await CourseFormModel.findById(req.params.id)
        res.render('btechformview',{view:result, name:userName, i:image, e:email})

    }catch(error){
        console.log(error)
    }
}
static BtechFormEdit = async (req, res)=>{
    try{
        const {userName,image, _id, email } = req.user
        const data = await CourseFormModel.findById(req.params.id)
        res.render('btechformedit',{d:data,name:userName, i:image, e:email})

    }catch(error){
        console.log(error)
    }
}
static BtechFormUpdate = async (req,res)=>{
    try{
        const { _id } = req.user
        const {userName, email, mobileNo, dob, gender, address, college, course, branch} = req.body
        const update = await CourseFormModel.findByIdAndUpdate(req.params.id,{
            userName: userName,
            email: email,
            mobileNo: mobileNo,
            dob: dob,
            gender: gender,
            address: address,
            college: college,
            coures: course,
            branch: branch,
            user_id: _id
        })
        res.redirect('/btechFormDisplay')

    }catch(error){
        console.log(error)
    }
}


static BCAForm = async (req, res)=>{
    try{
        const {userName,image, _id, email } = req.user
        res.render('bcaform',{name:userName, i:image, e:email})
    }catch(error){
        console.log(error)
    }
}
static BCAFormInsert = async (req, res)=>{
    try{
       //console.log( req.body)
       const { _id } = req.user
       const {userName, email, mobileNo, dob, gender, address, college, course, branch} = req.body
       const insert = await CourseFormModel({
        userName: userName,
        email: email,
        mobileNo: mobileNo,
         dob: dob,
         gender: gender,
         address: address,
         college: college,
        course: course,
        branch: branch,
        user_id: _id
    })
    await insert.save()
    res.redirect('/bcaformdisplay')

    }catch(error){
        console.log(error)
    }
}
static BCAFormDisplay = async (req, res)=>{
    try{
        const {userName,image, _id, email } = req.user
        const display = await CourseFormModel.find({user_id:_id})

        res.render('bcaformdisplay',{Btech:display,name:userName, i:image, e:email})

    }catch(error){
        console.log(error)
    }
}
static BCAFormView = async (req, res)=>{
    try{
        const {userName,image, _id, email } = req.user
        const result = await CourseFormModel.findById(req.params.id)
        res.render('bcaformview',{view:result, name:userName, i:image, e:email})

    }catch(error){
        console.log(error)
    }
}
static BCAFormEdit = async (req, res)=>{
    try{
        const {userName,image, _id, email } = req.user
        const data = await CourseFormModel.findById(req.params.id)
        res.render('bcaformedit',{d:data, name:userName, i:image, e:email})

    }catch(error){
        console.log(error)
    }
}
static BCAFormUpdate = async (req,res)=>{
    try{
        const { _id } = req.user
        const {userName, email, mobileNo, dob, gender, address, college, course, branch} = req.body
        const update = await CourseFormModel.findByIdAndUpdate(req.params.id,{
            userName: userName,
            email: email,
            mobileNo: mobileNo,
            dob: dob,
            gender: gender,
            address: address,
            college: college,
            coures: course,
            branch: branch,
            user_id: _id
        })
        res.redirect('/bcaFormDisplay')

    }catch(error){
        console.log(error)
    }
}


static MCAForm = async (req, res)=>{
    try{
        const {userName,image, _id, email } = req.user
        res.render('mcaform',{name:userName, i:image, e:email})
    }catch(error){
        console.log(error)
    }
}
static MCAFormInsert = async (req, res)=>{
    try{
       //console.log( req.body)
       const { _id } = req.user
       const {userName, email, mobileNo, dob, gender, address, college, course, branch} = req.body
       const insert = await CourseFormModel({
        userName: userName,
        email: email,
        mobileNo: mobileNo,
         dob: dob,
         gender: gender,
         address: address,
         college: college,
        course: course,
        branch: branch,
        user_id: _id
    })
    await insert.save()
    res.redirect('/mcaformdisplay')

    }catch(error){
        console.log(error)
    }
}
static MCAFormDisplay = async (req, res)=>{
    try{
        const {userName,image, _id, email } = req.user
        const display = await CourseFormModel.find({user_id:_id})

        res.render('mcaformdisplay',{Btech:display,name:userName, i:image, e:email})

    }catch(error){
        console.log(error)
    }
}
static MCAFormView = async (req, res)=>{
    try{
        const {userName,image, _id, email } = req.user
        const result = await CourseFormModel.findById(req.params.id)
        res.render('mcaformview',{view:result,name:userName, i:image, e:email})

    }catch(error){
        console.log(error)
    }
}
static MCAFormEdit = async (req, res)=>{
    try{
        const {userName,image, _id, email } = req.user
        const data = await CourseFormModel.findById(req.params.id)
        res.render('mcaformedit',{d:data, name:userName, i:image, e:email})

    }catch(error){
        console.log(error)
    }
}
static MCAFormUpdate = async (req,res)=>{
    try{
        const { _id } = req.user
        const {userName, email, mobileNo, dob, gender, address, college, course, branch} = req.body
        const update = await CourseFormModel.findByIdAndUpdate(req.params.id,{
            userName: userName,
            email: email,
            mobileNo: mobileNo,
            dob: dob,
            gender: gender,
            address: address,
            college: college,
            coures: course,
            branch: branch,
            user_id: _id
        })
        res.redirect('/mcaFormDisplay')

    }catch(error){
        console.log(error)
    }
}



}
module.exports = CourseController