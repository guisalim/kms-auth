import { AuthenticateOptions } from 'passport';
import { AppLogger } from '@/configuration/logger';
import oauth2 = require('passport-oauth2');

export interface IOauthProvider {
    id: TId;
    authenticateOptions: AuthenticateOptions;
    getStrategy(): oauth2.Strategy | undefined;
}

export type TId = undefined | 'github';

export abstract class OauthProvider implements Omit<IOauthProvider, 'id' | 'authenticateOptions'> {
    id: TId = undefined;
    constructor() {
        try {
            this.initialize();
        } catch (e) {
            AppLogger.error(`Failed to initialize oAuth provider: ${this.id}`)
        }
    }
    protected strategy: oauth2.Strategy | undefined;
    protected async initialize(): Promise<void> { };
    public getStrategy(): oauth2.Strategy | undefined {
        return this.strategy
    }
}