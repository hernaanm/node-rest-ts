import { Application } from 'express';
import postRoutes from './postRoutes';
import userRoutes from './userRoutes';

export default class Routes {

    
    constructor(app: Application) {
        //  User routes
        app.use('/api/users',userRoutes);
        //  Post routes
        app.use('/api/users',postRoutes);
    }

}