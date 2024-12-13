import Joi from "joi";
import { Userr } from "../models/user.model.js";
import { Todo } from "../models/todo.model.js";

const create = async (req, res, next) => {
    const validData = await Joi.object({
        username: Joi.string().trim().min(3).max(50).required(),
        surname: Joi.string().trim().min(3).max(50).required(),
        email: Joi.string().trim().email().required(),
      }).validateAsync(req.body, { abortEarly: false })
        .catch((err) => {
          console.log("err:", err);
          return res.status(422).json({
            message: "Xeta bash verdi!",
            error: err.details.map((item) => item.message),
          });
        });

    const newUser =await Userr.create({
    username: validData.username,
    surname: validData.surname,
    email: validData.email,
  })
  
  if(newUser) res.status(201).json(newUser)
  else{(error) =>
      res.status(500).json({
        message: "Xeta bash verdi!",
        error,
      })
    };
    await newUser.save()
};

const users = async(req, res, next) => {

  const users = await Userr.find();
 res.json(users)
 };

const UserEdit = async(req, res, next) => {
      
  const validData = await Joi.object({
    username: Joi.string().trim().min(3).max(50).required(),
    surname: Joi.string().trim().min(3).max(50).required(),
    email: Joi.string().trim().email().required(),
  }).validateAsync(req.body, { abortEarly: false })
    .catch((err) => {
      console.log("err:", err);
      return res.status(422).json({
        message: "Xeta bash verdi!",
        error: err.details.map((item) => item.message),
      });
    });

  const updateUser = await Userr.updateOne(
      { _id: req.params.userId },        
      { username: validData.username,
        surname: validData.surname,
        email: validData.email,}       
    );

    if (updateUser.modifiedCount > 0 ) {
      return res.json('User uğurla yeniləndi');
    } else {
      res.json('Heç bir dəyişiklik yoxdur');}
    
};

const DeleteUser = async(req, res, next) =>{
  const id = req.params.userId

  const user = await Userr.findOne({
      _id: id,
    });    

  if(!user) return res.json("Belə bir User yoxdur")

  const DeleteUser = await Userr.deleteOne({
      _id: id,
    });    

  res.send("User deleted successfully from database");
};

const UserAllTodos = async(req, res, next) =>{
  const user = await Userr.findOne({
    _id: req.params.userId,
  });    
  res.json(user.todos)
}

const CompletedTodos = async(req, res, next) =>{

const {completed} = req.query;
console.log(completed)
const isCompleted = completed === 'true';
console.log(isCompleted)
const todos = await Todo.find({ completed: isCompleted });

res.json(todos)

}

export const UserController = () => ({ create, users, UserEdit, DeleteUser, UserAllTodos,CompletedTodos });