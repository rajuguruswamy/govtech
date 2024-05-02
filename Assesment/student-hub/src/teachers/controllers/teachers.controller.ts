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

@Controller('teachers')
export class TeachersController {
  constructor(private readonly teacherService: TeachersService) {}

  //register one or more students to a specified teacher.
  @Post('register')
  @HttpCode(HttpStatus.NO_CONTENT)
  async registerStudents(
    @Body() registerStudentsToTeachertDto: RegisterStudentsToTeachertDto,
  ): Promise<void> {
    await this.teacherService.registerStudents(registerStudentsToTeachertDto);
  }

  // get common students
  @Get('commonstudents')
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

  // suspend student
  @Post('suspend')
  @HttpCode(HttpStatus.NO_CONTENT)
  async suspendStudent(
    @Body() suspendStudentDto: SuspendStudentDto,
  ): Promise<void> {
    console.log(suspendStudentDto.student);
    await this.teacherService.suspendStudent(suspendStudentDto);
  }

  //retrievefornotifications
  @Post('retrievefornotifications')
  async retrieveForNotifications(
    @Body() notificationRequestDto: NotificationRequestDto,
  ): Promise<NotificationRecipientsDto> {
    // try {
    //   const recipients = await this.teacherService.retrieveForNotifications(
    //     notificationRequestDto,
    //   );
    //   return { recipients: recipients };
    // } catch (error) {
    //   throw new HttpException(
    //     {
    //       statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
    //       error: 'Internal Server Error',
    //       message: 'An error occurred while retrieving students for noti.',
    //     },
    //     HttpStatus.INTERNAL_SERVER_ERROR,
    //   );
    // }
    const recipients = await this.teacherService.retrieveForNotifications(
      notificationRequestDto,
    );
    return { recipients: recipients };
  }

  //  create new teacher
  @Post()
  create(@Body() createTeacherDto: CreateTeacherDto): Promise<TeacherEntity> {
    return this.teacherService.create(createTeacherDto);
  }

  //  get all  teachers
  @Get()
  findAll(): Promise<TeacherEntity[]> {
    console.log('findAll');
    return this.teacherService.findAll();
  }

  //  get  a teacher record by id
  @Get(':id')
  findOne(@Param('id') id: number): Promise<TeacherEntity> {
    console.log('findOne');
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
