//Sever
const express=require('express')
const mongoose=require('mongoose')
const session = require('express-session');
//Controller
const articleModule = require('./controller/articles')
const loginModule=require('./controller/login')
//Model
const Blog=require('./model/blog')

//Init
const app=express()

app.use(session({
    secret:'HACK_CON_ME_MAY',
    saveUninitialized: false,
    resave: true
}));

app.use(function(req, res, next) {
    res.locals.user = req.session.username;
    next();
  });

mongoose.connect('mongodb+srv://satellite1012:satellite1012@cluster0.hdqsf.mongodb.net/Test?retryWrites=true&w=majority',{
    useNewUrlParser:true,
    useUnifiedTopology: true
})
app.set('view engine','ejs')
app.use(express.urlencoded({extended:false}))

//Payload Limit
var bodyParser = require('body-parser');
app.use(bodyParser.json({limit: "50mb"}));
app.use(bodyParser.urlencoded({limit: "50mb", extended: true, parameterLimit:50000}));

//Main
app.get('/',async (req,res)=>{
    const blogs=await Blog.find().sort({date:'desc'})
    res.render('index',{content:blogs})
})

//Module
app.use('/article',articleModule)
app.use('/login',loginModule)

//Listen to port 3000, or external env port on deployment
app.listen(process.env.PORT || 3000)