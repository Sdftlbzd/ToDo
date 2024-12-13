import Joi from "joi";
import { v4 as uuidv4 } from 'uuid';
import { Userr } from "../models/user.model.js";
import { Todo } from "../models/todo.model.js";

const createTodo = async (req, res, next) => {

    const { task } = await Joi.object({
      task: Joi.string().trim().min(5).max(100).required(),
    })
      .validateAsync(req.body, { abortEarly: false })
      .catch((err) => {
        return res.status(422).json({
          message: "Task formatı doğru deyil",
          error: err.details.map((item) => item.message),
        });
      });

      const user = await Userr.findOne({
        _id: req.params.userId,
      });

      if(!user) return res.json("Belə bir user yoxdur")
  
      const newTodo =await Todo.create({
      task,
      createdAt: Date.now(),
      userId: user
    })
    
    if(newTodo) res.status(201).json(newTodo)
    else{(error) =>
        res.status(500).json({
          message: "Todo yaradıla bilmədi",
          error,
        })
      };

    const updateUser = await Userr.updateMany(
            { _id: req.params.userId },        
            { $push: { todos: newTodo }}       
          );

      
    //       const updateUser = await Userr.updateOne(
    //   { _id: req.params.userId },
    //   { $push: { todos: { id: uuidv4()}, newTodo } } // Yeni todo obyektinə unikal ID əlavə edin
    // );

};

const todos = async(req, res, next) => {

 const todos = await Todo.find({});
res.json(todos)
};

const TodoEdit = async(req, res, next) => {
      
    const validData = await Joi.object({
        task: Joi.string().trim().min(5).max(100).required(),
        completed: Joi.boolean(),
      })
        .validateAsync(req.body, { abortEarly: false })
        .catch((err) => {
          return res.status(422).json({
            message: "Task formatı doğru deyil",
            error: err.details.map((item) => item.message),
          });
        });

        const todo = await Todo.findById({
            _id: req.params.id,
          });

           if(!todo) return res.json("Belə bir todo yoxdur")

    const updateTodo = await Todo.updateMany(
        { _id: req.params.id },
        {$set: {task: validData.task,
                completed: validData.completed,
                }}
    )
 
      if (updateTodo.modifiedCount > 0 ) {
        todo.createdAt = Date.now();
        await todo.save();
        return res.json('Todo uğurla yeniləndi');
      } else {
        res.json('Heç bir dəyişiklik yoxdur');}

};

const DeleteTodo = async(req, res, next) =>{
    const id = req.params.id

    const todo = await Todo.findOne({
        _id: id,
      }); 
      const user = await Userr.findOne({
        _id: req.params.userId,
      });    
const array = user.todos
const index= array.indexOf(req.params.id)

      if(!todo) return res.json("Belə bir todo yoxdur")

        const DeleteTodo = await Todo.findOneAndDelete({
            _id: id,
          });    
          res.json("Todo silindi")

    user.todos.splice(index, 1); 

    await user.save(); 

};

const DeleteAllTodos = async(req, res, next) =>{

      const user = await Userr.findOne({
        _id: req.params.userId,
      });    

const array = user.todos
if(array.length===0) return res.json("Bu userin heç bir todo-su yoxdur")

    const DeleteTodos = await Todo.deleteMany({
        userId: req.params.userId,
      });    
      array.splice(0 , array.length);
      await user.save()
    res.send("All todos deleted successfully from database");
  };

export const TodoController = () => ({ createTodo, todos, TodoEdit, DeleteTodo, DeleteAllTodos});