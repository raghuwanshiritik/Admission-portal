const CourseModel = require('../models/Course')
const UserModel = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
var cloudinary = require('cloudinary').v2;

cloudinary.config({ 
    cloud_name: 'dkwdscz4l', 
    api_key: '388856688969765', 
    api_secret: '7S0v5WOk8Yw-0QyIr1HjBj1Wifw',
   // secure: true
  });


class AdminController{

static DisplayData = async (req, res)=>{
    try{
        const {userName,image, _id, email } = req.user
        res.render('admin/dashboard',{name:userName, i:image, id:_id})
    }catch(error){
        console.log(error)
    }
}
static Welcome = async (req,res)=>{
    try{
        res.render('admin/welcomepage')
    }catch(error){
        console.log(error)
    }
}



static UserDisplay = async (req, res)=>{
    try{
        const userdata= await UserModel.find()
        res.render('admin/userDisplay',{data:userdata})

    }catch(error){
        console.log(error)
    }
}
static userFormDisplay = async (req,res)=>{
    try{
        const data = await CourseModel.find()
        res.render('admin/userFromDisplay',{form:data})
    }catch(error){
        consolo.log(error)
    }
}
static UerFormView = async (req, res)=>{
    try{
        const result = await CourseModel.findById(req.params.id)
        res.render('admin/formView',{view:result})
    }catch(error){
        console.log(error)
    }
}
static ChangePassword = async (req, res)=>{
    try{
        const {userName, _id, email } = req.user
        res.render('admin/changePassword',{id:_id,name:userName,message: req.flash('error'),message1: req.flash('success')})

    }catch(error){
        console.log(error)
    }
}
static UpdatePassword = async (req, res)=>{
    try{
       // console.log(req.body)
       const {oldpassword, newpassword, confirmpassword} = req.body
       if(oldpassword && newpassword && confirmpassword){
        if(newpassword == confirmpassword){
            const user = await UserModel.findById(req.params.id).select("+password")
            //console.log(user)
            const isMatch = await bcrypt.compare(oldpassword, user.password)
            if(isMatch){
                const salt = await bcrypt.genSalt(10)
                const newHashPassword = await bcrypt.hash(newpassword,salt)
                await UserModel.findByIdAndUpdate(req.params.id,{
                    $set:{password:newHashPassword} 
                });
                req.flash('success','Password Updated successfully')
                    res.redirect('/changePassword')
               
            }else{
                req.flash('error','old password is incorrect')
                res.redirect('/changePassword')
            }

        }else{
            req.flash('error','New password and old password does not matched')
            res.redirect('/changePassword')  
        }

       }else{
        req.flash('error','All field are required')
        res.redirect('/changePassword')
       }
    }catch(error){
      console.log(error)  
    }
}
static ViewProfile =async (req, res)=>{
    try{
        const viewp = await UserModel.findById(req.params.id)
        res.render('admin/viewProfile',{data:viewp})

    }catch(error){
        console.log(error)
    }
   
}
static EditProfile = async (req, res)=>{
    try{
        const profile = await UserModel.findById(req.params.id)
        res.render('admin/editProfile',{data:profile})

    }catch(error){
        console.log(error)
    }
}
static UpdateProfile = async (req, res) => {
    try {
      // console.log(req.body)
      // console.log(req.params.id)
      const image = req.files.image;
      if(image){
        //first delete the image
      const userProfile = await UserModel.findById(req.params.id);
      const imageid = userProfile.image.public_id;
      // console.log(imageid)
      await cloudinary.uploader.destroy(imageid);

      //second update iamge
      const file = req.files.image;     
        const myimage = await cloudinary.uploader.upload(file.tempFilePath, {
          folder: "AdmissionPortal",
        });
      const result = await UserModel.findByIdAndUpdate(req.params.id, {
        userName: req.body.userName,
        email: req.body.email,
        image: {
          public_id: myimage.public_id,
          url: myimage.secure_url
        },
      });
      await result.save();
      res.redirect("/admin/welcom");
      }
      
    } catch (error) {
      const result = await UserModel.findByIdAndUpdate(req.params.id, {
        userName: req.body.userName,
        email: req.body.email,
      });
      await result.save();
      res.redirect("/admin/welcom");
    }
  };








}
 module.exports = AdminController