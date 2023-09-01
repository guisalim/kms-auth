import { basename } from "path";
import { getApp, IGetApp } from '@src/controllers/_config/tests';
import Oauth from '../../configuration/oauth';

Oauth.authenticate = jest.fn(async (_req: any, _res: any, next: any) => {
    debugger;
    next();
});

describe('[E2E] AuthController', () => {
    const dirname = basename(__dirname);
    let server: undefined | IGetApp;

    beforeAll(() => {
        server = getApp();
    });
    afterAll((done) => {
        server?.close(done);
    });
    beforeEach(() => jest.clearAllMocks());

    test('/github', (done) => {
        server?.agent.get(`/${dirname}/github`)
            .expect(302)
            .end(done);
    });
});
