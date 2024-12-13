import express from 'express'
import { Router } from "express";
import {  TodoController } from '../controllers/todo.controller.js';
export const TodoRouter = Router();

const controller = TodoController()

TodoRouter.post('/create/:userId', controller.createTodo)
TodoRouter.get('/', controller.todos)
TodoRouter.patch('/:id', controller.TodoEdit)
TodoRouter.delete('/:userId/:id', controller.DeleteTodo)
TodoRouter.delete('/:userId', controller.DeleteAllTodos)