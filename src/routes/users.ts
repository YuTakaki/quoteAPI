import express from 'express';
import UsersController from '../controllers/users';

const route = express.Router();
const userController = new UsersController()

route.post(`/`, userController.createUser);
route.get(`/:idOrUsername`, userController.getUserInfo);

module.exports = route;