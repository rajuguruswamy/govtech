import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TeachersService } from './services/teachers.service';
import { TeachersController } from './controllers/teachers.controller';
import { TeacherEntity } from './entities/teacher.entity';
import { StudentEntity } from 'src/students/entities/student.entity';
import { StudentsModule } from '../students/students.module';
@Module({
  imports: [
    TypeOrmModule.forFeature([TeacherEntity, StudentEntity]),
    StudentsModule,
  ],
  providers: [TeachersService],
  controllers: [TeachersController],
  exports: [],
})
export class TeachersModule {}
