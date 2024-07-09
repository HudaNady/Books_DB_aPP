import mongoose from "mongoose";

const bookSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true,
        minLength:3
    },
    content:{
        type:String,
        required:true,
        minLength:3
    },
    author:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'Author'
    },
    publishedDate:{
        type:Date,
        default:Date.now
    }
})

const  Book=mongoose.model('Book',bookSchema)
export default Book