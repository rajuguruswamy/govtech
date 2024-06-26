import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';

import { CreateTeacherDto } from '../dto/create-teacher.dto';
import { UpdateTeacherDto } from '../dto/update-teacher.dto';
import { RegisterStudentsToTeachertDto } from '../dto/register-students-to-teacher-dto';
import { SuspendStudentDto } from '../dto/suspend-student.dto';
import { NotificationRequestDto } from '../dto/notification-request.dto';
import { TeacherEntity } from '../entities/teacher.entity';
import { StudentEntity } from '../../students/entities/student.entity';
import { StudentsService } from '../../students/services/students.service';
import { DuplicateRecordException } from '../../exceptions/duplicate-record.exception';

@Injectable()
export class TeachersService {
  private logger = new Logger('TeachersController');
  constructor(
    @InjectRepository(TeacherEntity)
    private readonly teacherRepository: Repository<TeacherEntity>,
    @InjectRepository(StudentEntity)
    private readonly studentRepository: Repository<StudentEntity>,
    private readonly studentsService: StudentsService,
  ) {}

  // Register one or more students to a specified teacher.
  async registerStudents(
    registerStudentsToTeachertDto: RegisterStudentsToTeachertDto,
  ): Promise<void> {
    try {
      const teacher = await this.getTechacherByEmail(
        registerStudentsToTeachertDto.teacherEmail,
      );

      //  throw exception if teacher email does not exist
      if (!teacher) {
        throw new NotFoundException(
          `Teacher with the email ${registerStudentsToTeachertDto.teacherEmail} not found`,
        );
      }

      const students = await Promise.all(
        registerStudentsToTeachertDto.studentEmails.map(
          async (studentEmail) => {
            const student =
              await this.studentsService.findStudentByEmail(studentEmail);

            if (!student) {
              throw new NotFoundException(
                `Stduent with the email ${studentEmail} not found`,
              );
            }
            return student;
          },
        ),
      );

      teacher.students = students;
      await this.teacherRepository.save(teacher);
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  // Retrieve students who are registered to ALL of the given teachers
  async retriveCommonStudents(teachersEmails: string[]): Promise<string[]> {
    try {
      const teachers = await this.teacherRepository.find({
        where: { email: In(teachersEmails) }, // Use In operator
      });

      const teacherIds = teachers.map((teacher) => teacher.id);

      if (teacherIds.length == 0) {
        this.logger.verbose(
          `Teacher with the email ${JSON.stringify(teachersEmails)} not found`,
        );
        return [];
      }

      const students = await this.studentRepository
        .createQueryBuilder('student')
        .innerJoin('student.teachers', 'teacher')
        .where('teacher.id IN (:...teacherIds)', { teacherIds })
        .groupBy('student.id')
        .having('count(distinct teacher.id) = :len', { len: teacherIds.length })
        .getMany();
      const studentEmails = students.map((student) => student.email);

      return studentEmails;
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  // Suspend student
  async suspendStudent(suspendStudentDto: SuspendStudentDto): Promise<void> {
    try {
      await this.studentsService.suspend(suspendStudentDto.student);
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  // Retrieve recipients for notification
  async retrieveForNotifications(
    notificationRequestDto: NotificationRequestDto,
  ): Promise<string[]> {
    try {
      // check if teacher email is null or empty
      if (!notificationRequestDto.teacher) {
        throw new NotFoundException('Teacher email is null or empty');
      }

      // check if the teacher email exists in the system
      const teacher = this.getTechacherByEmail(notificationRequestDto.teacher);
      if (!teacher) {
        throw new NotFoundException(
          `Teacher with the email ${notificationRequestDto.teacher} not found`,
        );
      }

      // extract email from notification
      const mentionedStudents = this.extractMentionedStudents(
        notificationRequestDto.notification,
      );

      // retrieve mentioned students only if not suspened and exists in the system.
      const mentionedEmails =
        await this.getMentionedStudentsEmail(mentionedStudents);

      // retrieve mentioned students only if not suspened and registed with teacher
      const registeredEmails = await this.getRegisteredStudentsEmail(
        notificationRequestDto.teacher,
      );

      const recipients = [
        ...new Set([...mentionedEmails, ...registeredEmails]),
      ].map((student) => student.email);

      return recipients.sort();
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  // get teacher by email
  async getTechacherByEmail(teacherEmail: string): Promise<TeacherEntity> {
    try {
      return await this.teacherRepository.findOne({
        where: { email: teacherEmail },
      });
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }
  // function to retrieve registerd student email
  async getRegisteredStudentsEmail(teacherEmail: string) {
    try {
      return await this.studentRepository
        .createQueryBuilder('student')
        .select('student.email')
        .innerJoin('student.teachers', 'teacher')
        .where('teacher.email  = :teacherEmail', {
          teacherEmail: teacherEmail,
        })
        .andWhere('student.isSuspended = :isSuspended', { isSuspended: false })
        .orderBy('student.email', 'ASC')
        .getMany();
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  // function to retrieve student email
  async getMentionedStudentsEmail(
    mentionedStudents: string[],
  ): Promise<StudentEntity[]> {
    try {
      if (mentionedStudents.length == 0) {
        return [];
      }

      return await this.studentRepository
        .createQueryBuilder('student')
        .select('student.email')
        .where('student.email IN (:...mentionedStudents)', {
          mentionedStudents,
        })
        .andWhere('student.isSuspended = :isSuspended', { isSuspended: false })
        .orderBy('student.email', 'ASC')
        .getMany();
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  // Create teacher
  async create(createTeacherDto: CreateTeacherDto): Promise<TeacherEntity> {
    try {
      const existingTeacher = await this.teacherRepository.findOne({
        where: { email: createTeacherDto.email },
      });
      // check if teacher already exist
      if (existingTeacher) {
        throw new DuplicateRecordException(
          `Teacher with the email ${createTeacherDto.email} already exists in the system`,
        );
      }
      const teacher = this.teacherRepository.create(createTeacherDto);
      return this.teacherRepository.save(teacher);
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  // Find all teacher
  async findAll(): Promise<TeacherEntity[]> {
    try {
      return await this.teacherRepository.find();
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  //  Find teacher  by id
  async findOne(id: number): Promise<TeacherEntity> {
    try {
      return await this.teacherRepository.findOne({ where: { id: id } });
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  // Update teacher record
  async update(
    id: number,
    updateTeacherDto: UpdateTeacherDto,
  ): Promise<TeacherEntity> {
    try {
      const teacher = await this.teacherRepository.findOne({
        where: { id: id },
      });

      if (!teacher) {
        throw new NotFoundException(
          `Teacher with the email ${updateTeacherDto.email} not found`,
        );
      }
      this.teacherRepository.merge(teacher, updateTeacherDto);
      return this.teacherRepository.save(teacher);
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  // Remove teacher record
  async remove(id: number): Promise<void> {
    try {
      await this.teacherRepository.delete(id);
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  // function to extract email address from input string to string array
  extractMentionedStudents(notification: string): string[] {
    const mentionedStudentsRegex = /@(\w+@\w+\.\w+)/g;
    // const emailRegex = /(\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b)/g;
    return (
      notification
        .match(mentionedStudentsRegex)
        ?.map((mention) => mention.substring(1)) || []
    );
  }
}
