const express = require('express');
const { createTodo,updateTodo } = require('./types');
const Todo = require('./db/todoSchema');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
const port = 3000

app.use(express.json())
app.use(cors())

app.get('/', async (req, res) => {
    const todos = await Todo.find({});
    console.log(todos)
    res.json({todos: todos})
})

app.post('/',async (req, res) => {
    const title = req.body.title;
    const description = req.body.description;
    try{
        const auth = createTodo.parse({
            title,
            description
        });
    }catch(e){
        res.status(400).json({
            msg: 'Invalid Request'
        });
        return;   
    }
    await Todo.create({
        title: req.body.title,
        description: req.body.description,
        status: req.body.status
    })
    res.json({msg: 'Todo created'})
})

app.put('/:id',async (req, res) => {
    const id = req.params.id;
    console.log(id.slice(1))
    try{
        const auth = updateTodo.parse({id: id});
    }catch(e){
        res.status(404).json({
            msg: 'Todo Not Found'
        });
        return;
    }
    await Todo.findByIdAndUpdate(req.params.id.slice(1), {
        status: req.body.status
    }, {new: true})
    res.json({msg: 'Todo updated'})
})

app.listen(port,()=>{
    console.log(`Server running on port ${port}`)
})

mongoose.connect(process.env.MONGODB_PASS);
const db = mongoose.connection;

db.once('open', function () {
    console.log('DB connected')
})