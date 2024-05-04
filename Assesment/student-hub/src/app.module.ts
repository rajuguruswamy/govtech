import { Module } from '@nestjs/common';
import { TeachersModule } from './teachers/teachers.module';
import { StudentsModule } from './students/students.module';

import { TypeOrmModule } from './datasource/typeorm.module';
import { AppController } from './app.controller';

@Module({
  imports: [TeachersModule, StudentsModule, TypeOrmModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
