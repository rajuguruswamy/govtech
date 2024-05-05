import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { ValidationPipe } from '@nestjs/common';
import { configService } from './config/config.service';
import * as dotenv from 'dotenv';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
dotenv.config();

async function bootstrap() {
  const logger = new Logger();

  const app = await NestFactory.create(AppModule);

  if (!configService.isProduction()) {
    const document = SwaggerModule.createDocument(
      app,
      new DocumentBuilder()
        .setTitle('Student Hub API')
        .setDescription('Student Hub  API')
        .setVersion('1.0')
        .build(),
    );

    SwaggerModule.setup('api', app, document);
  }

  // Enable global validation pipe
  app.useGlobalPipes(new ValidationPipe());

  const port = configService.getPort() || 3000;
  await app.listen(port);
  logger.log(
    `Student Hub API is running on port  ${port} in ${configService.getEnvironment()} mode.`,
  );
}
bootstrap();
