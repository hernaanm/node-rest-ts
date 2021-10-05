import { Router } from 'express';
import PostController from '../controllers/postConstroller';
import { tokenValidation } from '../middlewares/verifyToken';

class PostRoutes {

    router: Router;
    postController: PostController;

    constructor() {
        this.router = Router();
        this.postController = new PostController()
        this.initializeRoutes();
    }


    initializeRoutes() {
        this.router.get('/:userId/posts/',tokenValidation, this.postController.getPosts);
        this.router.post('/:userId/posts/', tokenValidation,this.postController.createPost);
        this.router.get('/:userId/posts/:url', tokenValidation,this.postController.getPost);
        this.router.put('/:userId/posts/:url', tokenValidation,this.postController.updatePost);
        this.router.delete('/:userId/posts/:url', tokenValidation,this.postController.deletePost);
    }
}

export default new PostRoutes().router;