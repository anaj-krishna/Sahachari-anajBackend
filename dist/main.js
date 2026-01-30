"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const app_bootstrap_1 = require("./config/app-bootstrap");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.enableCors({
        origin: '*',
        credentials: true,
    });
    (0, app_bootstrap_1.setupApp)(app);
    await app.listen(process.env.PORT || 3000, '0.0.0.0');
}
bootstrap().catch(console.error);
//# sourceMappingURL=main.js.map