const express=require('express')
const mongoose=require('mongoose')
const cors=require('cors')
const app=express();
app.use(cors())
app.use(express.json())

mongoose.connect('mongodb://127.0.0.1:27017/todoDB')
    .then(()=>console.log("Connected"))
    .catch((err)=>console.error('Mongoose connection err',err))

const taskSchema=new mongoose.Schema({
    title:{type:String,required:true},
    completed:{type:Boolean,default:false}
})
const Task=mongoose.model('Task',taskSchema)

app.get('/tasks',async(req,res)=>{
        const tasks=await Task.find();
        res.json(tasks)   
})

app.post('/tasks',async(req,res)=>{
    const newTask= new Task({title:req.body.title})
    await newTask.save()
    res.json(newTask)
})

app.put('/tasks/:id',async(req,res)=>{
    const task=await Task.findById(req.params.id)
    task.completed=!task.completed
    await task.save()
    res.json(task)
})
app.delete('/tasks/:id',async(req,res)=>{
    await Task.findByIdAndDelete(req.params.id)
    res.json({message:'Task deleted'})
})
app.listen((3000),()=>{
    console.log("server started on local host 3000");
})
