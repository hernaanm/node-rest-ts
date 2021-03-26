import { Request, Response, Router } from 'express'

class IndexRoutes {

    router: Router;


    routes() {
        this.router.get('/', (req: Request, res: Response) => {
           res.send('Api: /api/posts');
        })
    }

    constructor() {
        this.router = Router();
        this.routes();
    }

}


const indexRoutes = new IndexRoutes();
export default indexRoutes.router;