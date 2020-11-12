const express= require('express');
const exphbs=require('express-handlebars');
const morgan=require('morgan');
const multer=require('multer');
const path=require('path');
const {v4:uuid}=require('uuid');
const methodOverride = require("method-override");
const {format}=require('timeago.js')

//Innicialization
const app = express();
require('./db');

//Setting
app.set('port',process.env.PORT || 3000);
app.set('views', path.join(__dirname,'views'));
app.engine(
  ".hbs",
  exphbs({
    defaultLayout: "main",
    layoutsDir: path.join(app.get("views"), "layouts"),
    partialsDir: path.join(app.get("views"), "partials"),
    extname: ".hbs",
  })
);
app.set("view engine", ".hbs");

//app.engine('.hbs', exphbs({extname: '.hbs'}));
//app.set('view engine', '.hbs');
//app.set("view engine", ".ejs");

//Middlewars
app.use(morgan('dev'));
app.use(express.urlencoded({extended:false}));
app.use(methodOverride("_method"));

const storage= multer.diskStorage({
  destination:path.join(__dirname, 'public/img/uploads'),
  filename:(req,file,cb,filename)=>{
    cb(null, uuid() + path.extname(file.originalname));
  }
});
app.use(multer({
  storage: storage
}).single('image'));


//Global variables
app.use((req,res,next)=>{
  app.locals.format=format;
  next();
})


//Routes
app.use(require('./routes/index.routes.js'))

//Static files
app.use(express.static(path.join(__dirname, 'public')));

//Star server
app.listen(app.get('port'),()=>{
console.log(`Server on port ${app.get('port')}`)
})