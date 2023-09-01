import { AppLogger } from '@src/configuration/logger';
import { OauthProvider, IOauthProvider, TId } from './provider';
import { Strategy } from 'passport-github2';

export default class GithubProvider extends OauthProvider implements IOauthProvider {
    id: TId = 'github';

    authenticateOptions = {
        scope: ['user:email'],
        failureRedirect: '/login',
    }

    protected async initialize(): Promise<void> {
        const strategyOptions = {
            clientID: process.env.GITHUB_CLIENT_ID ?? '',
            clientSecret: process.env.GITHUB_CLIENT_SECRET ?? '',
            callbackURL: `http://localhost:${process.env.PORT}/oauth/github/callback`
        };

        this.strategy = new Strategy(strategyOptions, (accessToken: any, _refreshToken: any, _profile: any, done: any) => {
            AppLogger.info(JSON.stringify(accessToken, _refreshToken, _profile));
            done(undefined, { _profile, accessToken, _refreshToken });
        });
    }
}