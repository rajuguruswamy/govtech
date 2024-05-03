import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import * as dotenv from 'dotenv';

async function bootstrap() {
  dotenv.config();
  const app = await NestFactory.create(AppModule);

  const port = process.env.NODE_PORT || 3000;
  await app.listen(port);
  console.log(
    `Student Hub API is running on port ${port} in ${process.env.NODE_ENV} mode`,
  );
}
bootstrap();
