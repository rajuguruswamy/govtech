import { Test, TestingModule } from '@nestjs/testing';
import { StudentsService } from './students.service';
import { StudentEntity } from '../entities/student.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
// import { CreateStudentDto } from '../dto/create-student.dto';

describe('StudentsService', () => {
  let service: StudentsService;
  // let respository: Repository<StudentEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        StudentsService,
        {
          provide: getRepositoryToken(StudentEntity),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<StudentsService>(StudentsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  // describe('create', () => {
  //   it('should create a teacher', async () => {
  //     const createStudentDto: CreateStudentDto = {
  //       name: 'raju',
  //       email: 'raju@gmail.com',
  //     };

  //     const studentEntity = new StudentEntity();
  //     studentEntity.name = 'raju';
  //     studentEntity.email = 'raju@gmail.com';
  //     jest.spyOn(respository, 'create').mockReturnValue(studentEntity);
  //     jest.spyOn(respository, 'save').mockResolvedValue(studentEntity);

  //     const result = await service.create(createStudentDto);
  //     expect(result).toEqual(studentEntity);
  //   });
  // });
});
