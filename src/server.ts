import compression from 'compression'
import cors from 'cors'
import express from 'express'
import helmet from 'helmet'
import morgan from 'morgan'
import Database from './database'
import indexRoutes from './routes/indexRoutes'
import postRoutes from './routes/postRoutes'
import userRoutes from './routes/userRoutes'

class Server {

    app: express.Application;

    config() {
        //Settings
        require('dotenv').config()
        this.app.set('port', process.env.SERVER_PORT);
        //Database
        const database = new Database();
        database.connect();
        //Middlewares
        this.app.use(morgan('dev'));
        this.app.use(express.json());
        this.app.set('json spaces', 2)
        this.app.use(express.urlencoded({ extended: false }));
        this.app.use(helmet());
        this.app.use(compression());
        this.app.use(cors());
    }

    routes() {
        this.app.use(indexRoutes);
        this.app.use('/api/posts',postRoutes);
        this.app.use('/api/users',userRoutes);
    }

    start() {
        this.app.listen(this.app.get('port'), () => {
            console.log('Server running on port', this.app.get('port'));
        })
    }

    constructor() {
        this.app = express();
        this.config();
        this.routes();
    }
}

const server = new Server();
server.start();