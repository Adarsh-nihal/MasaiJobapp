const express=require("express")
const JobRouter=express.Router()

const {JobsModel}=require("../models/Jobs.model")


JobRouter.get("/",async(req,res)=>{
    try{
     const notes=await JobsModel.find()
     res.send(notes)
    }
    catch(err){
  res.send({"msg":"something Went wrong"})
    }
})


JobRouter.post("/add",async(req,res)=>{
    const payload=req.body
    try{
        const new_todo=new JobsModel(payload)
        new_todo.save()
        res.send({"msg":"todo is added"})
    }
    catch(err){
        console.log(err)
        res.send({"msg":"something went wrong"})
    }
})

JobRouter.delete("/delete/:todoId",async(req,res)=>{
    const todoId=req.params.todoId;
    const userId=req.body.userId
    const todo=await JobsModel.findOne({_id:todoId})
    if(userId!==todo.userId){
        res.send({"msg":"Not Authorised"})
    }
    else{
    try{
        await JobsModel.findByIdAndDelete({_id:todoId})
        res.send({"msg":"todo is deleted"})
    }
    catch(err){
        console.log(err)
        res.send({"msg":"something went wrong"})
    }
    }
})
JobRouter.patch("/update/:todoId",async(req,res)=>{
    const todoId=req.params.todoId;
    const userId=req.body.userId
    const payload=req.body
    const todo=await JobsModel.findOne({_id:todoId})
    if(userId!==todo.userId){
        res.send({"msg":"Not Authorised"})
    }
    else{
    try{
        await JobsModel.findByIdAndUpdate({_id:todoId},payload)
        res.send({"msg":"todo is updated"})
    }
    catch(err){
        console.log(err)
        res.send({"msg":"something went wrong"})
    }
    }
})

module.exports={JobRouter}