import { Test, TestingModule } from '@nestjs/testing';
import { TeachersController } from './teachers.controller';
import { TeachersService } from '../services/teachers.service';
// import { CreateTeacherDto } from '../dto/create-teacher.dto';
// import { UpdateTeacherDto } from '../dto/update-teacher.dto';
// import { TeacherEntity } from '../entities/teacher.entity';

describe('TeachersController', () => {
  let controller: TeachersController;
  let service: TeachersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TeachersController],
      providers: [
        {
          provide: TeachersService,
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

    controller = module.get<TeachersController>(TeachersController);
    service = module.get<TeachersService>(TeachersService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  // describe('create', () => {
  //   it('should create a teacher', async () => {
  //     const createTeacherDto: CreateTeacherDto = {
  //         name: 'teacher ken',
  //       email: 'teacherken@gmail.com',
  //     };
  //     const teacherEntity: TeacherEntity = { id: 1, ...createTeacherDto };

  //     jest.spyOn(service, 'create').mockResolvedValue(teacherEntity);

  //     const result = await controller.create(createTeacherDto);
  //     expect(result).toEqual(teacherEntity);
  //   });
  // });
});
