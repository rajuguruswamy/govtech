import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Param,
} from '@nestjs/common';
import { StudentsService } from '../services/students.service';
import { CreateStudentDto } from '../dto/create-student.dto';
import { StudentEntity } from '../entities/student.entity';
import { UpdateStudentDto } from '../dto/update-student.dto';

@Controller('students')
export class StudentsController {
  constructor(private readonly studentService: StudentsService) {}

  // create new student
  @Post()
  create(@Body() createStudentDto: CreateStudentDto): Promise<StudentEntity> {
    return this.studentService.create(createStudentDto);
  }

  //  get all  students
  @Get()
  findAll(): Promise<StudentEntity[]> {
    return this.studentService.findAll();
  }

  //  get  a student record by id
  @Get(':id')
  findOne(@Param('id') id: number): Promise<StudentEntity> {
    return this.studentService.findOne(id);
  }

  // update teacher by teacher id
  @Put(':id')
  update(
    @Param('id') id: number,
    @Body() updateStudentDto: UpdateStudentDto,
  ): Promise<StudentEntity> {
    return this.studentService.update(id, updateStudentDto);
  }

  // delete  a teacher record by id
  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.studentService.remove(id);
  }
}
