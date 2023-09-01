import { Controller, Get, Route, SuccessResponse } from "tsoa";
import { IHealth_GetHealth_Response } from '@/controllers/_interfaces';

@Route('health')
export class HealthController extends Controller {
    @SuccessResponse("200", "API is healthy")
    @Get()
    public async getHealth(): Promise<IHealth_GetHealth_Response> {
        return {
            message: "API is healthy!",
        };
    }
}

export default HealthController
