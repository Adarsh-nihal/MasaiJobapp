const mongoose=require("mongoose")

const JobsSchema=mongoose.Schema({
     CompanyName:String,
    Position:String,
    Contract:String,
    Location:String

})

const JobsModel=mongoose.model("todo",JobsSchema)


module.exports={JobsModel}