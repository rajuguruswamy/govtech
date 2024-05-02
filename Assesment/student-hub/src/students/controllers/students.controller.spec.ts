import { Test, TestingModule } from '@nestjs/testing';
import { StudentsController } from './students.controller';
import { StudentsService } from '../services/students.service';
// import { CreateStudentDto } from '../dto/create-student.dto';
// import { StudentEntity } from '../entities/StudentEntity';

describe('StudentsController', () => {
  let controller: StudentsController;
  let service: StudentsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StudentsController],
      providers: [
        {
          provide: StudentsService,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
            findOne: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<StudentsController>(StudentsController);
    service = module.get<StudentsService>(StudentsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  // describe('create', () => {
  //   if (
  //     ('it should create a student',
  //     async () => {
  //       const createStudentDto: CreateStudentDto = {
  //         name: 'student1',
  //         email: 'student1@gmail.com',
  //       };
  //       const timestamp: number = Date.now();

  //       const studentEntity: StudentEntity = {
  //         id: 1,
  //         createDateTime: timestamp,
  //         lastChangedDateTime: timestamp,
  //         ...createStudentDto,
  //       };
  //       jest.spyOn(service, 'create').mockResolvedValue(studentEntity);
  //       const result = await controller.create(createStudentDto);
  //       expect(result).toEqual(studentEntity);
  //     })
  //   );
  // });
});
