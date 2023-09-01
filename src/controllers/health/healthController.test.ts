import { basename } from "path";
import HealthController from "./healthController";
import { getApp } from '@/controllers/_config/tests';

describe('[Unit] HealthController', () => {
    test('/', async () => {
        const controller = new HealthController();
        const response = await controller.getHealth()
        expect(JSON.stringify(response)).toEqual(JSON.stringify({ message: 'API is healthy!' }));
    });
});

describe('[E2E] HealthController', () => {
    const dirname = basename(__dirname);
    test('/', (done) => {
        const { agent } = getApp();
        agent
            .get(`/${dirname}`)
            .set('Accept', 'application/json')
            .expect(response => {
                expect(response.get('Content-Type')).toMatch(/json/);
                expect(response.body.message).toEqual('API is healthy!');
            })
            .end(done);

    });
});
