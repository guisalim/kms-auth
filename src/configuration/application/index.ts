import dotenv from 'dotenv';
import express, { Express } from 'express';
import AppControllers from "@src/controllers";
import { AppMiddlewares } from '@src/middlewares';
import { AppLogger } from '@src/configuration/logger';
import { AppVault } from '@src/configuration/vault';
import { Server } from 'node:http';

interface IApplicationConfig {
    PORT?: string;
    envFilePath?: string;
}

class Application {
    app: Express = express();
    PORT: string | number = process.env.PORT ?? 3000;
    server?: Server;

    constructor({ PORT, envFilePath }: IApplicationConfig = {}) {
        dotenv.config(envFilePath ? { path: envFilePath } : undefined);
        this.PORT = PORT ?? this.PORT
        this.start();
    }

    getInstance(): Express {
        if (!this.app) {
            this.app = express();
        }

        if (!this.app) {
            const errorMessage = "Unable to find server instance";
            AppLogger.error(errorMessage)
            throw new Error(errorMessage);
        }

        return this.app;
    }

    start() {
        AppLogger.info(`Initializing Application`);
        const app = this.getInstance();
        new AppMiddlewares().apply(app);
        new AppControllers().apply(app);
        new AppVault();

        this.server = app.listen(this.PORT, () => {
            AppLogger.info(`Server running at http://localhost:${this.PORT}`);
        });

        this.server.on('close', () => {
            AppLogger.warn(`Server successfuly closed`);
        });
    }
}

export default Application
