import { Test, TestingModule } from '@nestjs/testing';
import { TeachersService } from './teachers.service';
import { TeacherEntity } from '../entities/teacher.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
// import { CreateTeacherDto } from '../dto/create-teacher.dto';

describe('TeachersService', () => {
  let service: TeachersService;
  // let repository: Repository<TeacherEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TeachersService,
        {
          provide: getRepositoryToken(TeacherEntity),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<TeachersService>(TeachersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  // describe('create', () => {
  //   it('should create a teacher', async () => {
  //     const createTeacherDto: CreateTeacherDto = {
  //       name: 'teacher ken',
  //       email: 'teacherken@gmail.com',
  //     };
  //     const teacherEntity = new TeacherEntity();
  //     teacherEntity.name = 'teacher ken';
  //     teacherEntity.email = 'teacherken@gmail.com';

  //     jest.spyOn(repository, 'create').mockReturnValue(teacherEntity);
  //     jest.spyOn(repository, 'save').mockResolvedValue(teacherEntity);

  //     const result = await service.create(createTeacherDto);
  //     expect(result).toEqual(teacherEntity);
  //   });
  // });
});
