

const express =require('express')
const UserController = require('./controllers/UserController')
const connectdb = require('./db/connectdb')
const fileUpload = require("express-fileupload");
const cloudinary = require('cloudinary');
const app =express()
const port =8000
const session = require('express-session')
const flash = require('connect-flash');
const CourseController = require('./controllers/CourseController')
const { application } = require('express')
const Admin_auth = require('./middleware/auth')
//cookies
 const cookiesParser =require('cookie-parser');
const AdminController = require('./controllers/AdminController');
 app.use(cookiesParser())

//connection database(db)
connectdb()


//template engin or (ejs setup)
app.set('view engine', 'ejs')

//This is use to get data
app.use(express.urlencoded({extended:false}))

//for file uplode
app.use(fileUpload({useTempFiles: true}));



//for flesh Message
app.use(session({
        secret: 'secret',
        cookie: { maxAge: 60000 },
        resave: false,
        saveUninitialized: false,
        
      }));
app.use(flash());



//public folder setup
app.use(express.static('public'))


// user route
app.get('/', UserController.Login)
app.get('/home',Admin_auth, UserController.Home)
app.get('/about',Admin_auth, UserController.About)
app.get('/contact',Admin_auth, UserController.Contact)
app.get('/Registration',UserController.Registration)
app.post('/registerInsert', UserController.RegisterInsert)
app.post('/veryfyLogin',UserController.VeryfyLogin)
app.get('/logout',UserController.Logout)

// Btech course route
app.get('/btechForm',Admin_auth, CourseController.BtechForm)
app.post('/btechFormInsert',Admin_auth, CourseController.BtechFormInsert)
app.get('/btechFormDisplay',Admin_auth, CourseController.BtechFormDisplay)
app.get('/btechFormView/:id',Admin_auth, CourseController.BtechFormView)
app.get('/btechFormEdit/:id',Admin_auth, CourseController.BtechFormEdit)
app.post('/btechFormUpdate/:id',Admin_auth, CourseController.BtechFormUpdate)
// BCA course route
app.get('/BcaForm',Admin_auth, CourseController.BCAForm)
app.post('/bcaFormInsert',Admin_auth,CourseController.BCAFormInsert)
app.get('/bcaformdisplay',Admin_auth, CourseController.BCAFormDisplay)
app.get('/bcaFormView/:id',Admin_auth, CourseController.BCAFormView)
app.get('/bcaFormEdit/:id',Admin_auth, CourseController.BCAFormEdit)
app.post('/bcaFormUpdate/:id',Admin_auth, CourseController.BCAFormUpdate)
// MCA course app
app.get('/mcaForm',Admin_auth, CourseController.MCAForm)
app.post('/mcaFormInsert',Admin_auth,CourseController.MCAFormInsert)
app.get('/mcaformdisplay',Admin_auth, CourseController.MCAFormDisplay)
app.get('/mcaFormView/:id',Admin_auth, CourseController.MCAFormView)
app.get('/mcaFormEdit/:id',Admin_auth, CourseController.MCAFormEdit)
app.post('/mcaFormUpdate/:id',Admin_auth, CourseController.MCAFormUpdate)

// Admin components app
app.get('/adminDashboard',Admin_auth, AdminController.DisplayData)
app.get('/admin/welcome', AdminController.Welcome)
app.get('/admin/userDisplay', AdminController.UserDisplay)
app.get('/admin/userFormDisplay',AdminController.userFormDisplay)
app.get('/admin/formView/:id', AdminController.UerFormView)
app.get('/changePassword',Admin_auth, AdminController.ChangePassword)
app.post('/updatepassword/:id',Admin_auth, AdminController.UpdatePassword)
app.get('/viewProfile/:id',Admin_auth, AdminController.ViewProfile)
app.get('/editProfile/:id',Admin_auth, AdminController.EditProfile)
app.post('/updateProfile/:id',Admin_auth, AdminController.UpdateProfile)


//server create
app.listen(port, () =>{
        console.log('server start localhost:8000')
})