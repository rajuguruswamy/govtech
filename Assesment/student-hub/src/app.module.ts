import { Module } from '@nestjs/common';
import { TeachersModule } from './teachers/teachers.module';
import { StudentsModule } from './students/students.module';

import { TypeOrmModule } from './datasource/typeorm.module';

@Module({
  imports: [TeachersModule, StudentsModule, TypeOrmModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
