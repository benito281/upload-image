const {Schema,model} = require('mongoose');

const imageSchema= new Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    filename:{
        type:String,
        required:true
    },
    path:{
        type:String,
        required:true
    },
    originalname:{
        type:String,
        required:true
    },
    minetype:{
        type:String
    },
    size:{
        type:Number
    }/* ,
    created_at_:{
        type:Date,
        default:Date.now()
    } */
    
},
{
    timestamps:true
});

module.exports= model('Images',imageSchema);