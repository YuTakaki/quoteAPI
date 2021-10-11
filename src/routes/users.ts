import express from 'express';
import UsersController from '../controllers/users';
import Middleware from '../middleware/middleware';

const route = express.Router();
const userController = new UsersController()
const middleware = new Middleware()

route.post(`/`, userController.createUser);
route.use('/:idOrUsername', middleware.checkParams)
route.get(`/:idOrUsername`, userController.getUserInfo);
route.delete(`/:idOrUsername`, userController.deleteUser);
route.patch(`/:idOrUsername`, userController.updateUser);

module.exports = route;