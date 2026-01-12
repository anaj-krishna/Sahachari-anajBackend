import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { setupApp } from './config/app-bootstrap';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: '*',
    credentials: true,
  });

  setupApp(app);

  await app.listen(process.env.PORT || 3000, '0.0.0.0');
}

bootstrap().catch(console.error);
