const express = require("express"); 
const {Todo,validateTodo} = require("../models/todo");
const { catchAsyncErrors } = require("../middleware");



const router = express.Router();

router.get("/", catchAsyncErrors( async (req, res) => {
    const todos = await Todo.find();
    res.json(todos);
}));

router.get("/:id", catchAsyncErrors(async (req, res) => {
    const { id } = req.params;
    const todos = await Todo.findById(id);
   if(!todos) return res.status(404).json({message:"todo is not found"})
    res.json(todos);
}));

router.delete("/:id", catchAsyncErrors(async (req, res) => {
    const { id } = req.params;
    const todos = await Todo.findByIdAndDelete(id);
    if(!todos) return res.status(404).json({message:"todo is not found"})
    res.json(todos);
}));

router.put("/:id", catchAsyncErrors(async (req, res) => {
    const{error}=validateTodo(req.body)
    if(error) return res.status(400).json({message:error.details[0].message})
    const { id } = req.params;
    const {value } = req.body;
    const todos = await Todo.findById(id)
    if(!todos)return res.status(404).json({message:"todo is not found"})
    todos.value = value;
    await todos.save();
    res.json(todos);
}));


router.post("/", async (req, res) => {
    const { error }=validateTodo(req.body);
    if(error)return res.status(400).json({message: error.details[0].message})

    const newTodo = new Todo(req.body);
    await newTodo.save();
    res.json(newTodo);
});

module.exports = router