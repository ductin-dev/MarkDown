//Init
const express=require('express')
const router=express.Router()

//Used Model
const Blog=require('./../model/blog')

router.get('/new',(req,res)=>{
    res.render('new')
})

router.get('/:id',(req,res)=>{
    const info=req.params.id
    res.render("success",{info})
})

router.get('/view/:id',async (req,res)=>{
    const blog=await Blog.findById(req.params.id)
    res.render("viewblog",{blog})
})

router.post('/upload',async (req,res)=>{
    const blog=new Blog({
        title:req.body.postTitle,
        des:req.body.postDes,
        content:req.body.postContent,
        author:req.body.postAuthor
    })
    try{
        await blog.save()
        res.redirect(`/article/${blog.id}`)
    }catch(e){
        console.log(e)
        res.render('new')
    }
})

//Export module
module.exports=router