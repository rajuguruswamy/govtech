import { Module } from '@nestjs/common';
import { StudentsService } from './services/students.service';
import { StudentsController } from './controllers/students.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudentEntity } from './entities/student.entity';
import { TeacherEntity } from 'src/teachers/entities/teacher.entity';

@Module({
  imports: [TypeOrmModule.forFeature([StudentEntity, TeacherEntity])],
  providers: [StudentsService],
  controllers: [StudentsController],
  exports: [],
})
export class StudentsModule {}
