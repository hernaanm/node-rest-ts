import { Router } from 'express';
import PostController from '../controllers/postConstroller';


class PostRoutes {

    router: Router;
    postController: PostController;

    constructor() {
        this.router = Router();
        this.postController = new PostController()
        this.initializeRoutes();
    }


    initializeRoutes() {
        this.router.get('/', this.postController.getPosts);
        this.router.get('/:url', this.postController.getPost);
        this.router.post('/', this.postController.createPost);
        this.router.put('/:url', this.postController.updatePost);
        this.router.delete('/:url', this.postController.deletePost);
    }
}

export default new PostRoutes().router;