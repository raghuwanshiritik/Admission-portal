const UserModel = require('../models/user')
var cloudinary = require('cloudinary').v2;
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const CourseFormModel = require('../models/Course');

cloudinary.config({ 
    cloud_name: 'dkwdscz4l', 
    api_key: '388856688969765', 
    api_secret: '7S0v5WOk8Yw-0QyIr1HjBj1Wifw',
   // secure: true
  });



class UserController{
    static Login = (req, res)=>{
        try{
           res.render('login',{message: req.flash('error'),message1: req.flash('success')})

        }catch(error){
            console.log(error)
        }
    }
    static Home = async (req, res)=>{
        try{

            const {userName,image, _id, email } = req.user
             const btech = await CourseFormModel.findOne({user_id:_id,course:"B.Tech"})
             const bca = await CourseFormModel.findOne({user_id:_id,course:"BCA"})
             const mca = await CourseFormModel.findOne({user_id:_id,course:"MCA"})      
             res.render('home',{name:userName, i:image,Bt:btech,Bc:bca,Mc:mca})


        }catch(error){
            console.log(error)
        }
    }
    static About = async (req, res)=>{
        try{
            const {userName,image, _id, email } = req.user
            res.render('about',{name:userName, i:image})

        }catch(error){
            console.log(error)
        }
       
    }
    static Contact = async (req, res)=>{
        try{
            const {userName,image, _id, email } = req.user 
            res.render('contact',{name:userName, i:image})
        }catch(error){
            console.log(error)
        }
       
    }
    static Registration = async (req, res)=>{
        try{

            res.render('registration',{message: req.flash('error')})

        }catch(error){
            console.log(error)
        }
    }
    static RegisterInsert = async (req, res)=>{
        try{
            //console.log(req.files.image)
            const file = req.files.image

            //this code send to cloudanary of image
            const myimage = await cloudinary.uploader.upload(file.tempFilePath,{
                folder: 'AdmissionPortal'
            })
           // console.log(myimage)
           // this code send to database  off data
           const {userName, email, password , confirmpassword} = req.body
           const user = await UserModel.findOne({email:email})
           if(user){
                req.flash('error','Email alredy exist')
                res.redirect('/registration')
           }else{
                if(userName && email && password && confirmpassword ){
                    if(password == confirmpassword){
                        const hashpassword = await bcrypt.hash(password,10)
                        const result = new UserModel({
                            userName: userName,
                            email: email,
                            password: hashpassword,
                            image:{
                               public_id: myimage.public_id,
                               url: myimage.secure_url
                            }
                      })
                      await result.save()
                      req.flash('success','Registration Successfully Please Login Here')
                      res.redirect('/')

                    }else{
                        req.flash('error','Password and confirmpassword does in match')
                        res.redirect('/registration')
                    }

                }else{
                    req.flash('error','All fields are required')
                    res.redirect('/registration')
                }
           }
          

        }catch(error){
            console.log(error)
        }
    }
    static VeryfyLogin = async (req, res)=>{
        try{
            //console.log(req.body)
            const {email, password} = req.body
            if(email && password){
                const admin = await UserModel.findOne({email:email})

                if(admin != null){
                    const ismatched = await bcrypt.compare(password, admin.password)
                    if(ismatched){
                        if(admin.role=="user"){
                            const token = jwt.sign({ id: admin._id }, 'ankityadav123')
                            res.cookie('token',token)
                            //console.log(token) 
                            res.redirect('/home')
                        }
                        if(admin.role=="admin"){
                            const token = jwt.sign({ id: admin._id }, 'ankityadav123')
                        res.cookie('token',token)
                        //console.log(token) 
                        res.redirect('/adminDashboard') 
                        }
                       
                       

                    }else{
                        req.flash('error','Email or password is not matched')
                        res.redirect('/')
                    }

                }else{
                    req.flash('error','you are not registerd user')
                    res.redirect('/')
                }

            }else{
                req.flash('error','All fields are required')
                res.redirect('/')
            }

        }catch(error){
            console.log(error)
        }
    }






    static Logout = async (req, res)=>{
        try{
            res.clearCookie('token')
            res.redirect('/')

        }catch(error){
            console.log(error)
        }
    }
    








}
module.exports = UserController
