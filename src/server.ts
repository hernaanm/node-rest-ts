import compression from 'compression'
import cors from 'cors'
import express from 'express'
import helmet from 'helmet'
import morgan from 'morgan'
import Database from './database'
import Routes from './routes/indexRoutes'

class Server {

    app: express.Application;

    constructor() {
        this.app = express();
        this.config();
        new Routes(this.app);
    }

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


    start() {
        this.app.listen(this.app.get('port'), () => {
            console.log('Server running on port', this.app.get('port'));
        })
    }

}

const server = new Server();
server.start();