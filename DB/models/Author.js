import mongoose from "mongoose";

const authorSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        minLength:3
    },
    bio:{
        type:String,
        minLength:3
    },
    birthDate:Date,
    isdeleted:{
        type:Boolean,
        default:false
    },
    books: [{ type: mongoose.Schema.Types.ObjectId,
            required:true,
            ref:'Book' 
        }]
})

const Author=mongoose.model('Author',authorSchema)
export default Author