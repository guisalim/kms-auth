import { Controller, Get, Route, Middlewares } from "tsoa";
import Oauth from '@src/configuration/oauth';

@Route('oauth')
export class OauthController extends Controller {
    @Get(":provider")
    @Middlewares(Oauth.authenticate)
    public async login(): Promise<void> {
        return;
    }

    @Get(":provider/callback")
    @Middlewares(Oauth.callbackAuth)
    public async callback(): Promise<void> {
        return;
    }

    @Get(":provider/logout")
    @Middlewares(Oauth.unauthenticate)
    public async logout(): Promise<void> {
        return;
    }   
}

export default OauthController
