import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { ValidationPipe } from '@nestjs/common';

import * as dotenv from 'dotenv';

async function bootstrap() {
  const logger = new Logger();
  dotenv.config();
  const app = await NestFactory.create(AppModule);

  // Enable global validation pipe
  app.useGlobalPipes(new ValidationPipe());

  const port = process.env.NODE_PORT || 3000;
  await app.listen(port);
  logger.log(
    `Student Hub API is running on port ${port} in ${process.env.NODE_ENV} mode`,
  );
}
bootstrap();
