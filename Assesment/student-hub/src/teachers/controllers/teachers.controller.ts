import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Param,
  HttpCode,
  HttpStatus,
  Query,
  HttpException,
} from '@nestjs/common';
import { TeachersService } from '../services/teachers.service';
import { CreateTeacherDto } from '../dto/create-teacher.dto';
import { UpdateTeacherDto } from '../dto/update-teacher.dto';
import { TeacherEntity } from '../entities/teacher.entity';
import { RegisterStudentsToTeachertDto } from '../dto/register-students-to-teacher-dto';
import { CommonStudentsResponseDto } from '../dto/common-students.dto';
import { SuspendStudentDto } from '../dto/suspend-student.dto';
import { NotificationRecipientsDto } from '../dto/notification-recipients.dto';
import { NotificationRequestDto } from '../dto/notification-request.dto';

@Controller('/api')
export class TeachersController {
  constructor(private readonly teacherService: TeachersService) {}

  //Register one or more students to a specified teacher.
  @Post('register')
  @HttpCode(HttpStatus.NO_CONTENT)
  async registerStudents(
    @Body() registerStudentsToTeachertDto: RegisterStudentsToTeachertDto,
  ): Promise<void> {
    await this.teacherService.registerStudents(registerStudentsToTeachertDto);
  }

  // Get common students
  @Get('/commonstudents')
  @HttpCode(HttpStatus.OK)
  async getCommonStudents(
    @Query('teacher') teacherEmail: string[],
  ): Promise<CommonStudentsResponseDto> {
    try {
      const teachersEmailArray = Array.isArray(teacherEmail)
        ? teacherEmail
        : [teacherEmail];

      const studentEmails =
        await this.teacherService.retriveCommonStudents(teachersEmailArray);
      return { students: studentEmails };
    } catch (error) {
      throw new HttpException(
        {
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          error: 'Internal Server Error',
          message: 'An error occurred while retrieving common students.',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // Suspend student
  @Post('/suspend')
  @HttpCode(HttpStatus.NO_CONTENT)
  async suspendStudent(
    @Body() suspendStudentDto: SuspendStudentDto,
  ): Promise<void> {
    console.log(suspendStudentDto.student);
    await this.teacherService.suspendStudent(suspendStudentDto);
  }

  //Retrieve  student email for notifications
  @Post('/retrievefornotifications')
  @HttpCode(HttpStatus.OK)
  async retrieveForNotifications(
    @Body() notificationRequestDto: NotificationRequestDto,
  ): Promise<NotificationRecipientsDto> {
    const recipients = await this.teacherService.retrieveForNotifications(
      notificationRequestDto,
    );
    return { recipients: recipients };
  }

  //  Create new teacher
  @Post('/teachers')
  create(@Body() createTeacherDto: CreateTeacherDto): Promise<TeacherEntity> {
    return this.teacherService.create(createTeacherDto);
  }

  //  Get all teachers
  @Get('/teachers')
  findAll(): Promise<TeacherEntity[]> {
    return this.teacherService.findAll();
  }

  //  Get  a teacher record by id
  @Get('/teachers/:id')
  findOne(@Param('id') id: number): Promise<TeacherEntity> {
    return this.teacherService.findOne(id);
  }

  // Update teacher by teacher id
  @Put('/teachers/:id')
  update(
    @Param('id') id: number,
    @Body() updateTeacherDto: UpdateTeacherDto,
  ): Promise<TeacherEntity> {
    return this.teacherService.update(id, updateTeacherDto);
  }

  // Delete  a teacher record by id
  @Delete('/teachers/:id')
  remove(@Param('id') id: number): Promise<void> {
    return this.teacherService.remove(id);
  }
}
