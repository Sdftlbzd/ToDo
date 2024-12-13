import express from 'express'
import { Router } from "express";
import {  UserController } from '../controllers/user.controller.js';
export const UserRouter = Router();

const controller = UserController()

UserRouter.post('/create', controller.create)
UserRouter.get('/', controller.users)
UserRouter.patch('/:userId', controller.UserEdit)
UserRouter.delete('/:userId', controller.DeleteUser)
UserRouter.get('/:userId/allTodos', controller.UserAllTodos)
UserRouter.get('/:userId/todos', controller.CompletedTodos)