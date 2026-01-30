"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupApp = setupApp;
const common_1 = require("@nestjs/common");
function setupApp(app) {
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
    }));
}
//# sourceMappingURL=app-bootstrap.js.map