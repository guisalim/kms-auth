import { Express } from "express";
import supertest from "supertest";
import Application from '@/configuration/application';

export interface IGetApp {
    app: Express;
    agent: supertest.SuperAgentTest,
    close: (callback?: ((err?: Error | undefined) => void) | undefined) => void;
}

export function getApp(): IGetApp {
    const jestWorkerId = parseInt(process.env.JEST_WORKER_ID ?? '');
    const application = new Application({ PORT: `${parseInt(process.env.PORT) + jestWorkerId}` });
    if (!application.server) {
        throw new Error("Failed to load application");
    }

    
    const app = application.getInstance();
    const agent = supertest.agent(app);
    const close = (callback?: ((err?: Error | undefined) => void) | undefined) => {
        application.server?.close(callback)
    };

    return { agent, app, close };
}
