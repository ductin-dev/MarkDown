const express=require('express')
const mongoose=require('mongoose')
const articleModule = require('./controller/articles')
//Model
const Blog=require('./model/blog')
const app=express()

//Payload Limit
var bodyParser = require('body-parser');
app.use(bodyParser.json({limit: "50mb"}));
app.use(bodyParser.urlencoded({limit: "50mb", extended: true, parameterLimit:50000}));

mongoose.connect('mongodb+srv://satellite1012:satellite1012@cluster0.hdqsf.mongodb.net/Test?retryWrites=true&w=majority',{
    useNewUrlParser:true,
    useUnifiedTopology: true
})

app.set('view engine','ejs')
app.use(express.urlencoded({extended:false}))

app.get('/',async (req,res)=>{
    const blogs=await Blog.find().sort({createdate:'desc'})
    res.render('index',{content:blogs})
})

app.use('/article',articleModule)

app.listen(3000)