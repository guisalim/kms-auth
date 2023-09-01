import morgan from "morgan";
import cors from "cors";
import helmet from "helmet";
import bodyParser from "body-parser";

import { Express } from 'express';
import expressSession from 'express-session';
import Oauth from '@src/configuration/oauth';
import { AppLogger } from '@src/configuration/logger';

export class AppMiddlewares {
    apply(app: Express) {
        if (!app) {
            return;
        }
        AppLogger.info('Initializing AppMiddlewares');
        this.setupLogging(app);
        this.setupBodyParse(app);
        this.setupSession(app);
    }

    private setupLogging = (app: Express) => {
        if (!app) {
            return;
        }
        app.use(cors());
        app.use(morgan("tiny"));
        app.use(helmet());
    };

    private setupBodyParse = (app: Express) => {
        app.use(bodyParser.urlencoded({ extended: true }));
        app.use(bodyParser.json());
    };

    private setupSession = (app: Express) => {
        app.use(expressSession({ secret: 'keyboard cat', resave: true, saveUninitialized: true }));
        Oauth.applyMiddleware(app);
    }
}
