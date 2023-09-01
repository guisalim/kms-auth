import { Express } from 'express';
import { RegisterRoutes } from "@swagger/routes";

class AppControllers {
    apply(app: Express) {
        RegisterRoutes(app);
    }
}

export default AppControllers