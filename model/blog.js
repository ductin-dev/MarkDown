const mongoose=require('mongoose')

const schema=new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    des:{
        type:String,
        default:'Không có tóm tắt'
    },
    content:{
        type:String,
        required:true
    },
    isPublic:{
        type:Boolean,
        default:false
    },
    date:{
        type:String,
        default:(new Date()).toLocaleDateString()
    }
})

module.exports=mongoose.model('Blog',schema)