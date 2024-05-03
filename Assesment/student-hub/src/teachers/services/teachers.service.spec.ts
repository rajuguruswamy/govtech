import { Test, TestingModule } from '@nestjs/testing';
import { TeachersService } from './teachers.service';
import { StudentsService } from '../../students/services/students.service';
import { TeacherEntity } from '../entities/teacher.entity';
import { StudentEntity } from '../../students/entities/student.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTeacherDto } from '../dto/create-teacher.dto';
import { NotFoundException } from '@nestjs/common';
import { SuspendStudentDto } from '../dto/suspend-student.dto';

describe('TeachersService', () => {
  let teacherService: TeachersService;
  let studentsService: StudentsService;

  let teacherRepository: Repository<TeacherEntity>;
  let studentRepository: Repository<StudentEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TeachersService,
        StudentsService,
        {
          provide: getRepositoryToken(TeacherEntity),
          useClass: Repository,
        },
        {
          provide: getRepositoryToken(StudentEntity),
          useClass: Repository,
        },
      ],
    }).compile();
    teacherService = module.get<TeachersService>(TeachersService);
    teacherRepository = module.get<Repository<TeacherEntity>>(
      getRepositoryToken(TeacherEntity),
    );
    studentRepository = module.get<Repository<StudentEntity>>(
      getRepositoryToken(StudentEntity),
    );

    studentsService = module.get<StudentsService>(StudentsService);
  });

  it('should be defined', () => {
    expect(teacherService).toBeDefined();
  });

  describe('registerStudents', () => {
    it('should register students to a teacher', async () => {
      // Mock the teacher and students
      const teacher = new TeacherEntity();
      teacher.id = 1;
      teacher.email = 'teacher@gmail.com';

      const studentEmails = ['studentA@gmail.com', 'studentB@gmail.com'];
      const students = studentEmails.map((email) => {
        const student = new StudentEntity();
        student.email = email;
        return student;
      });

      jest
        .spyOn(teacherService, 'getTechacherByEmail')
        .mockResolvedValue(teacher);
      jest
        .spyOn(studentsService, 'findStudentByEmail')
        .mockResolvedValue(students[0]);
      jest
        .spyOn(studentsService, 'findStudentByEmail')
        .mockResolvedValueOnce(students[1]);

      const saveMock = jest.fn().mockReturnValue(teacher);
      teacherRepository.save = saveMock.bind(teacherRepository);

      const registerStudentsToTeachertDto = {
        teacherEmail: 'teacherA@gmail.com',
        studentEmails: ['studentA@gmail.com', 'studentB@gmail.com'],
      };

      await teacherService.registerStudents(registerStudentsToTeachertDto);

      expect(
        teacher.students.sort((a, b) => a.email.localeCompare(b.email)),
      ).toEqual(students);
      expect(saveMock).toHaveBeenCalledWith(teacher);
    });
  });

  it('should throw NotFoundException if teacher email not found', async () => {
    jest.spyOn(teacherService, 'getTechacherByEmail').mockResolvedValue(null);

    const registerStudentsToTeachertDto = {
      teacherEmail: 'nonexistent@gmail.com',
      studentEmails: ['student1@gmail.com'],
    };

    await expect(
      teacherService.registerStudents(registerStudentsToTeachertDto),
    ).rejects.toThrow(NotFoundException);
  });

  it('should throw NotFoundException if student email not found', async () => {
    const teacher = new TeacherEntity();
    teacher.id = 1;
    teacher.email = 'teacher@gmail.com';

    jest
      .spyOn(teacherService, 'getTechacherByEmail')
      .mockResolvedValue(teacher);
    jest.spyOn(studentsService, 'findStudentByEmail').mockResolvedValue(null);

    const registerStudentsToTeachertDto = {
      teacherEmail: 'teacher@gmail.com',
      studentEmails: ['nonexistent@gmail.com'],
    };

    await expect(
      teacherService.registerStudents(registerStudentsToTeachertDto),
    ).rejects.toThrow(NotFoundException);
  });

  it('should retrieve students registered to all given teachers', async () => {
    // Mock the behavior of teacherRepository.find
    const teacher1 = new TeacherEntity();
    teacher1.id = 1;
    teacher1.email = 'teacher1@gmail.com';

    const teacher2 = new TeacherEntity();
    teacher2.id = 2;
    teacher2.email = 'teacher2@gmail.com';

    const teachers = [teacher1, teacher2];

    jest.spyOn(teacherRepository, 'find').mockResolvedValue(teachers);

    // Mock the behavior of studentRepository.createQueryBuilder
    const students = [
      { email: 'student1@gmail.com' },
      { email: 'student2@gmail.com' },
    ];
    jest.spyOn(studentRepository, 'createQueryBuilder').mockReturnValue({
      innerJoin: jest.fn().mockReturnThis(),
      where: jest.fn().mockReturnThis(),
      groupBy: jest.fn().mockReturnThis(),
      having: jest.fn().mockReturnThis(),
      getMany: jest.fn().mockResolvedValue(students),
    } as any);

    const commonStudents = await teacherService.retriveCommonStudents([
      'teacher1@gmail.com',
      'teacher2@gmail.com',
    ]);

    expect(commonStudents).toEqual([
      'student1@gmail.com',
      'student2@gmail.com',
    ]);
  });

  it('should retrieve recipients for notifications', async () => {
    const notificationRequestDto = {
      teacher: 'teacher@gmail.com',
      notification: 'Hello students! @student1@gmail.com  @student2@gmail.com',
    };

    const teacher = new TeacherEntity();
    teacher.id = 1;
    teacher.email = 'teacher@gmail.com';

    const student1 = new StudentEntity();
    student1.id = 1;
    student1.email = 'student1@gmail.com';

    const student2 = new StudentEntity();
    student2.id = 2;
    student2.email = 'student2@gmail.com';

    jest
      .spyOn(teacherService, 'getTechacherByEmail')
      .mockResolvedValue(teacher);
    jest
      .spyOn(teacherService, 'extractMentionedStudents')
      .mockReturnValue(['student1@gmail.com', 'student2@gmail.com']);
    jest
      .spyOn(teacherService, 'getMentionedStudentsEmail')
      .mockResolvedValue([student1, student2]);
    jest
      .spyOn(teacherService, 'getRegisteredStudentsEmail')
      .mockResolvedValue([]);

    const recipients = await teacherService.retrieveForNotifications(
      notificationRequestDto,
    );

    expect(recipients).toEqual(['student1@gmail.com', 'student2@gmail.com']);
  });

  it('should retrieve mentioned students emails', async () => {
    const mentionedStudents = ['student1@gmail.com', 'student2@gmail.com'];
    const expectedStudents = mentionedStudents.map((email) => ({
      email,
    }));
    jest.spyOn(studentRepository, 'createQueryBuilder').mockReturnValue({
      select: jest.fn().mockReturnThis(),
      where: jest.fn().mockReturnThis(),
      andWhere: jest.fn().mockReturnThis(),
      orderBy: jest.fn().mockReturnThis(),
      getMany: jest.fn().mockResolvedValue(expectedStudents),
    } as any);

    const result =
      await teacherService.getMentionedStudentsEmail(mentionedStudents);

    expect(result).toEqual(expectedStudents);
  });

  it('should return an empty array if mentionedStudents   empty', async () => {
    const result1 = await teacherService.getMentionedStudentsEmail([]);

    expect(result1).toEqual([]);
  });

  it('should suspend a student', async () => {
    const studentDto: SuspendStudentDto = {
      student: 'student@gmail.com',
    };

    const student1 = new StudentEntity();
    student1.id = 1;
    student1.email = 'student@gmail.com';

    jest.spyOn(studentRepository, 'findOne').mockResolvedValue(student1);
    const saveMock = jest.fn().mockReturnValue(student1);
    studentRepository.save = saveMock;

    await teacherService.suspendStudent(studentDto);
    const suspendedStudent = await studentsService.findStudentByEmail(
      studentDto.student,
    );

    expect(saveMock).toHaveBeenCalledWith(student1);
    expect(suspendedStudent.isSuspended).toBe(true);
  });
});
