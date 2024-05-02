import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = SwaggerModule.createDocument(
    app,
    new DocumentBuilder()
      .setTitle('Student Hub')
      .setDescription(
        'Student Hub allows Teachers to perform administrative functions for their students',
      )
      .setVersion('1.0')
      .build(),
  );

  SwaggerModule.setup('Student Hub API', app, config);
  await app.listen(3000);
}
bootstrap();
