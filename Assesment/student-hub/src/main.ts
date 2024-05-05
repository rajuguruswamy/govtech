import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { ValidationPipe } from '@nestjs/common';
import { configService } from './config/config.service';
import * as dotenv from 'dotenv';
dotenv.config();

async function bootstrap() {
  const logger = new Logger();

  const app = await NestFactory.create(AppModule);

  // Enable global validation pipe
  app.useGlobalPipes(new ValidationPipe());

  const port = configService.getPort() || 3000;
  await app.listen(port);
  logger.log(
    `Student Hub API is running on port  ${port} in ${configService.getEnvironment()} mode.`,
  );
}
bootstrap();
