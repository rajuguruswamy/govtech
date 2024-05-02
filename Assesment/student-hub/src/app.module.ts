import { Module } from '@nestjs/common';
import { TeachersModule } from './teachers/teachers.module';
import { StudentsModule } from './students/students.module';
import { NotificationsModule } from './notifications/notifications.module';
import { TypeOrmModule } from './datasource/typeorm.module';

@Module({
  imports: [TeachersModule, StudentsModule, NotificationsModule, TypeOrmModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
