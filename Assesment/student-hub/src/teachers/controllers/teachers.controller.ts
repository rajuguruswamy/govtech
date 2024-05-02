import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Param,
  // HttpCode,
  // HttpStatus,
} from '@nestjs/common';
import { TeachersService } from '../services/teachers.service';
import { CreateTeacherDto } from '../dto/create-teacher.dto';
import { UpdateTeacherDto } from '../dto/update-teacher.dto';
import { TeacherEntity } from '../entities/teacher.entity';
// import { RegisterStudentsToTeachertDto } from '../dto/register-students-to-teacher-dto';

@Controller('teachers')
export class TeachersController {
  constructor(private readonly teacherService: TeachersService) {}

  // //register one or more students to a specified teacher.
  // @Post('register')
  // @HttpCode(HttpStatus.NO_CONTENT)
  // async registerStudents(
  //   @Body() registerStudentsToTeachertDto: RegisterStudentsToTeachertDto,
  // ): Promise<void> {
  //   await this.teacherService.registerStudents(registerStudentsToTeachertDto);
  // }

  //  create new teacher
  @Post()
  create(@Body() createTeacherDto: CreateTeacherDto): Promise<TeacherEntity> {
    return this.teacherService.create(createTeacherDto);
  }

  //  get all  teachers
  @Get()
  findAll(): Promise<TeacherEntity[]> {
    return this.teacherService.findAll();
  }

  //  get  a teacher record by id
  @Get(':id')
  findOne(@Param('id') id: number): Promise<TeacherEntity> {
    return this.teacherService.findOne(id);
  }

  // update teacher by teacher id
  @Put(':id')
  update(
    @Param('id') id: number,
    @Body() updateTeacherDto: UpdateTeacherDto,
  ): Promise<TeacherEntity> {
    return this.teacherService.update(id, updateTeacherDto);
  }

  // delete  a teacher record by id
  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.teacherService.remove(id);
  }
}
