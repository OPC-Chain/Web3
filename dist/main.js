"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const config_1 = require("@nestjs/config");
const app_module_1 = require("./app.module");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule, { cors: true });
    app.enableCors();
    app.useGlobalPipes(new common_1.ValidationPipe());
    const configService = app.get(config_1.ConfigService);
    const PORT = configService.get('PORT', '4000');
    await app.listen(PORT, '0.0.0.0');
    common_1.Logger.log(`App running on ${await app.getUrl()}`, 'START');
}
bootstrap();
//# sourceMappingURL=main.js.map