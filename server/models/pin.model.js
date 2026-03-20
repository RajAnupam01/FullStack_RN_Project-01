import mongoose, { mongo } from "mongoose";

const pinSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
        trim:true
    },
    description:{
        type:String,
        required:true
    },
    category:{
        type:String,
        lowercase:true,
        required:true,
        index:true
    },
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    image:{
        type:String,
        required:true,
    },
    imagePublicId:{
        type:String,
    },

    likes:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }],

},{timestamps:true})

const Pin = mongoose.model("Pin",pinSchema);

export default Pin;
