import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { StudentEntity } from '../entities/student.entity';
import { Repository } from 'typeorm';
import { CreateStudentDto } from '../dto/create-student.dto';
import { UpdateStudentDto } from '../dto/update-student.dto';

@Injectable()
export class StudentsService {
  constructor(
    @InjectRepository(StudentEntity)
    private readonly studentRepository: Repository<StudentEntity>,
  ) {}

  //  Create Student Record
  async create(createStudentDto: CreateStudentDto): Promise<StudentEntity> {
    const student = this.studentRepository.create(createStudentDto);
    return this.studentRepository.save(student);
  }

  //  list all students Record
  async findAll(): Promise<StudentEntity[]> {
    return await this.studentRepository.find();
  }

  //  find student Record By id
  async findOne(studentId: number): Promise<StudentEntity> {
    return await this.studentRepository.findOne({ where: { id: studentId } });
  }

  async findStudentByEmail(studentEmail: string): Promise<StudentEntity> {
    return await this.studentRepository.findOne({
      where: { email: studentEmail },
    });
  }
  //  update student Record by studentId
  async update(
    studentId: number,
    updateStdentDto: UpdateStudentDto,
  ): Promise<StudentEntity> {
    const student = await this.studentRepository.findOne({
      where: { id: studentId },
    });
    this.studentRepository.merge(student, updateStdentDto);
    return this.studentRepository.save(student);
  }
  //  delete student by id

  async remove(studentId: number): Promise<void> {
    await this.studentRepository.delete({ id: studentId });
  }
}
