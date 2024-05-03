import { Test, TestingModule } from '@nestjs/testing';
import { TeachersController } from './teachers.controller';
import { TeachersService } from '../services/teachers.service';
import { CommonStudentsResponseDto } from '../dto/common-students.dto';
import { NotificationRecipientsDto } from '../dto/notification-recipients.dto';
import { SuspendStudentDto } from '../dto/suspend-student.dto';
import { CreateTeacherDto } from '../dto/create-teacher.dto';
import { UpdateTeacherDto } from '../dto/update-teacher.dto';

describe('TeachersController', () => {
  let controller: TeachersController;
  let teacherService: TeachersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TeachersController],
      providers: [
        {
          provide: TeachersService,
          useValue: {
            registerStudents: jest.fn(),
            retriveCommonStudents: jest.fn(),
            suspendStudent: jest.fn(),
            retrieveForNotifications: jest.fn(),
            create: jest.fn(),
            findAll: jest.fn(),
            findOne: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<TeachersController>(TeachersController);
    teacherService = module.get<TeachersService>(TeachersService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('registerStudents', () => {
    it('should register students', async () => {
      const registerStudentsToTeacherDto = {
        teacherEmail: 'teacher1@gmail.com',
        studentEmails: ['student1@gmail.com', 'student2@gmail.com'],
      };
      await controller.registerStudents(registerStudentsToTeacherDto);
      expect(teacherService.registerStudents).toHaveBeenCalledWith(
        registerStudentsToTeacherDto,
      );
    });
  });

  describe('getCommonStudents', () => {
    it('should get common students', async () => {
      const teacherEmail = ['teacher1@gmail.com', 'teacher2@gmail.com'];
      const expectedResponse: CommonStudentsResponseDto = {
        students: ['student1@gmail.com', 'student2@gmail.com'],
      };
      (teacherService.retriveCommonStudents as jest.Mock).mockResolvedValue(
        expectedResponse.students,
      );
      const response = await controller.getCommonStudents(teacherEmail);
      expect(response).toEqual(expectedResponse);
    });
  });

  describe('suspendStudent', () => {
    it('should suspend a student', async () => {
      const suspendStudentDto: SuspendStudentDto = {
        student: 'student@gmail.com',
      };
      await controller.suspendStudent(suspendStudentDto);
      expect(teacherService.suspendStudent).toHaveBeenCalledWith(
        suspendStudentDto,
      );
    });
  });

  describe('retrieveForNotifications', () => {
    it('should retrieve notification recipients', async () => {
      const notificationRequestDto = {
        teacher: 'teacher@gmail.com',
        notification: 'Hey @student1@gmail.com and @student2@gmail.com',
      };
      const expectedResponse: NotificationRecipientsDto = {
        recipients: ['student1@gmail.com', 'student2@gmail.com'],
      };
      (teacherService.retrieveForNotifications as jest.Mock).mockResolvedValue(
        expectedResponse.recipients,
      );
      const response = await controller.retrieveForNotifications(
        notificationRequestDto,
      );
      expect(response).toEqual(expectedResponse);
    });
  });

  describe('create', () => {
    it('should create a teacher', async () => {
      const createTeacherDto: CreateTeacherDto = {
        email: 'teacher@gmail.com',
      };
      const expectedResponse: CreateTeacherDto = {
        email: 'teacher@gmail.com',
      };
      (teacherService.create as jest.Mock).mockResolvedValue(expectedResponse);
      const response = await controller.create(createTeacherDto);
      expect(response).toEqual(expectedResponse);
    });
  });

  describe('findAll', () => {
    it('should find all teachers', async () => {
      const expectedResponse: CreateTeacherDto[] = [
        { email: 'teacher1@gmail.com' },
        { email: 'teacher2@gmail.com' },
      ];
      (teacherService.findAll as jest.Mock).mockResolvedValue(expectedResponse);
      const response = await controller.findAll();
      expect(response).toEqual(expectedResponse);
    });
  });

  describe('findOne', () => {
    it('should find a teacher by id', async () => {
      const id = 1;
      const expectedResponse: CreateTeacherDto = {
        email: 'teacher@gmail.com',
      };
      (teacherService.findOne as jest.Mock).mockResolvedValue(expectedResponse);
      const response = await controller.findOne(id);
      expect(response).toEqual(expectedResponse);
    });
  });

  describe('update', () => {
    it('should update a teacher', async () => {
      const id = 1;
      const updateTeacherDto: UpdateTeacherDto = {
        email: 'teacher@gmail.com',
      };
      const expectedResponse: CreateTeacherDto = {
        email: 'teacher@gmail.com',
      };
      (teacherService.update as jest.Mock).mockResolvedValue(expectedResponse);
      const response = await controller.update(id, updateTeacherDto);
      expect(response).toEqual(expectedResponse);
    });
  });

  describe('remove', () => {
    it('should remove a teacher by id', async () => {
      const id = 1;
      await controller.remove(id);
      expect(teacherService.remove).toHaveBeenCalledWith(id);
    });
  });
});
