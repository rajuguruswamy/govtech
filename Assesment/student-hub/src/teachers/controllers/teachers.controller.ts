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
  Logger,
  ParseIntPipe,
  ValidationPipe,
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
import { IsArray, IsNotEmpty } from 'class-validator';

@Controller('/api')
export class TeachersController {
  private logger = new Logger('TeachersController');
  constructor(private readonly teacherService: TeachersService) {}

  //Register one or more students to a specified teacher.
  @Post('register')
  @HttpCode(HttpStatus.NO_CONTENT)
  async registerStudents(
    @Body() registerStudentsToTeachertDto: RegisterStudentsToTeachertDto,
  ): Promise<void> {
    try {
      this.logger.verbose(
        `Register students ${registerStudentsToTeachertDto.studentEmails} to the teacher ${registerStudentsToTeachertDto.teacherEmail}`,
      );
      await this.teacherService.registerStudents(registerStudentsToTeachertDto);
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  // Get common students
  @Get('/commonstudents')
  @HttpCode(HttpStatus.OK)
  async getCommonStudents(
    @Query('teacher')
    teacherEmail: string[],
  ): Promise<CommonStudentsResponseDto> {
    this.logger.verbose(`Get common students for teacher : ${teacherEmail}`);
    try {
      const teachersEmailArray = Array.isArray(teacherEmail)
        ? teacherEmail
        : [teacherEmail];

      const studentEmails =
        await this.teacherService.retriveCommonStudents(teachersEmailArray);
      return { students: studentEmails };
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  // Suspend student
  @Post('/suspend')
  @HttpCode(HttpStatus.NO_CONTENT)
  async suspendStudent(
    @Body() suspendStudentDto: SuspendStudentDto,
  ): Promise<void> {
    this.logger.verbose(`Suspend student : ${suspendStudentDto.student}`);
    try {
      await this.teacherService.suspendStudent(suspendStudentDto);
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  //Retrieve  student email for notifications
  @Post('/retrievefornotifications')
  @HttpCode(HttpStatus.OK)
  async retrieveForNotifications(
    @Body() notificationRequestDto: NotificationRequestDto,
  ): Promise<NotificationRecipientsDto> {
    this.logger.verbose(
      `Retrieve  student email for notifications : ${JSON.stringify(notificationRequestDto)}`,
    );
    try {
      const recipients = await this.teacherService.retrieveForNotifications(
        notificationRequestDto,
      );
      return { recipients: recipients };
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  //  Create new teacher
  @Post('/teachers')
  create(@Body() createTeacherDto: CreateTeacherDto): Promise<TeacherEntity> {
    this.logger.verbose(
      `Create new teacher :  ${JSON.stringify(createTeacherDto)}`,
    );

    try {
      return this.teacherService.create(createTeacherDto);
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  //  Get all teachers
  @Get('/teachers')
  findAll(): Promise<TeacherEntity[]> {
    this.logger.verbose(`Get all teachers`);
    try {
      return this.teacherService.findAll();
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  //  Get a teacher record by id
  @Get('/teachers/:id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<TeacherEntity> {
    this.logger.verbose(`Get teacher record by id : ${id} `);
    try {
      return this.teacherService.findOne(id);
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  // Update teacher by teacher id
  @Put('/teachers/:id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateTeacherDto: UpdateTeacherDto,
  ): Promise<TeacherEntity> {
    this.logger.verbose(
      `Update teacher record by id : ${id} and body : ${JSON.stringify(updateTeacherDto)}`,
    );
    try {
      return this.teacherService.update(id, updateTeacherDto);
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  // Delete  a teacher record by id
  @Delete('/teachers/:id')
  remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    this.logger.verbose(`Delete teacher record by id : ${id} `);
    try {
      return this.teacherService.remove(id);
      this.logger.verbose(``);
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }
}
