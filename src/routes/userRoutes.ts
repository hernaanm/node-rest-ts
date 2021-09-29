import { Router } from 'express';
import UserController from '../controllers/userController';
import { tokenValidation } from '../middlewares/verifyToken';


class UserRoutes {

    router: Router;
    userController: UserController;

    constructor() {
        this.router = Router();
        this.userController = new UserController();
        this.initializeRoutes();
    }



    initializeRoutes() {
        this.router.get('/', this.userController.getUsers);
        this.router.get('/:userId', tokenValidation, this.userController.getUser);
        this.router.post('/', this.userController.createUser);
        this.router.post('/auth', this.userController.loginUser);
        this.router.put('/:userId', tokenValidation ,this.userController.updateUser);
        this.router.delete('/:userId',tokenValidation, this.userController.deleteUser);
    }
}

export default new UserRoutes().router;