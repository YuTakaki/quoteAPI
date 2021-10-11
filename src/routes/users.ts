import express from 'express';
import UsersController from '../controllers/users';

const route = express.Router();
const userController = new UsersController()

route.post(`/`, userController.createUser);
route.use('/:idOrUsername', userController.checkParams)
route.get(`/:idOrUsername`, userController.getUserInfo);
route.delete(`/:idOrUsername`, userController.deleteUser);
route.patch(`/:idOrUsername`, userController.updateUser);

module.exports = route;