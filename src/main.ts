import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: '*',
  });

  const port = process.env.PORT ?? 5000;
  console.log(`PORT`, port);
  await app.listen(port);
}

bootstrap();
