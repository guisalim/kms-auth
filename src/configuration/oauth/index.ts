import { Express, Request, Response, NextFunction } from 'express';
import passport from 'passport';
import * as providers from './providers';

export default class Oauth {
    private static instance = passport;

    static getInstance() {
        return Oauth.instance;
    }

    private static getProviderByName(name: string): undefined | providers.IOauthProvider {
        try {
            const provider = (providers as unknown as { [key: string]: any })[name];
            if (!(typeof provider?.constructor)) {
                return undefined;
            }

            return new provider();
        } catch(e) {
            
        }
        return undefined
    }

    static applyMiddleware(app: Express) {
        const instance = Oauth.getInstance();

        app.use(instance.initialize());
        app.use(instance.session());

        for (const id in providers) {
            const provider = Oauth.getProviderByName(id);
            const strategy = provider?.getStrategy();
            if (!strategy) continue;
            instance.use(strategy);
        }
    }

    static async authenticate(request: Request, response: Response, next: NextFunction) {
        const { provider: id } = request.params
        if (!id) return;
        const instance = Oauth.getInstance();
        const provider = Oauth.getProviderByName(id);
        const authenticateOptions = provider?.authenticateOptions ?? {};
        await instance.authenticate(id, authenticateOptions)(request, response, next);
        next();
    }

    static async callbackAuth(request: Request, response: Response, next: NextFunction) {
        const { provider: id } = request.params
        if (!id) return;
        const instance = Oauth.getInstance();
        const provider = Oauth.getProviderByName(id);
        const authenticateOptions = provider?.authenticateOptions ?? {};
        await instance.authenticate(id, authenticateOptions, console.log)(request, response, next);
        response.redirect('/');
    }

    static unauthenticate = async (request: Request, response: Response, next: NextFunction) => {
        request.logout({ keepSessionInfo: false }, () => { });
        response.redirect('/');;
    }
}   