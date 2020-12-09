//Init
const express=require('express')
const router=express.Router()

//Used Model
const User=require('./../model/user')

router.get('/',(req,res)=>{
    res.render('login')
})

router.post('/userlogin', (req,res)=>{
    res.redirect('/')
})

//Export module
module.exports=router
