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
});
