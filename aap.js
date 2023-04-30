

const express =require('express')
const connectdb = require('./db/connectdb')
const fileUpload = require("express-fileupload");
const cloudinary = require('cloudinary');
const app =express()
const port =8000
const web = require('./routes/web')
const session = require('express-session')
const flash = require('connect-flash');
const { application } = require('express')
//cookies
 const cookiesParser =require('cookie-parser');
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

//route.load
app.use('/',web)

//public folder setup
app.use(express.static('public'))




//server create
app.listen(port, () =>{
        console.log('server start localhost:8000')
})