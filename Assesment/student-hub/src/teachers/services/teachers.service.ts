import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTeacherDto } from '../dto/create-teacher.dto';
import { UpdateTeacherDto } from '../dto/update-teacher.dto';
import { RegisterStudentsToTeachertDto } from '../dto/register-students-to-teacher-dto';

import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { TeacherEntity } from '../entities/teacher.entity';
import { StudentEntity } from '../../students/entities/student.entity';

@Injectable()
export class TeachersService {
  constructor(
    @InjectRepository(TeacherEntity)
    private readonly teacherRepository: Repository<TeacherEntity>,
    @InjectRepository(StudentEntity)
    private readonly studentRepository: Repository<StudentEntity>,
  ) {}

  // register one or more students to a specified teacher.
  async registerStudents(
    registerStudentsToTeachertDto: RegisterStudentsToTeachertDto,
  ): Promise<void> {
    const teacher = await this.teacherRepository.findOne({
      where: { email: registerStudentsToTeachertDto.teacherEmail },
    });

    //  throw exception if teacher email does not exist
    if (!teacher) {
      throw new NotFoundException(
        `Teacher with the email ${registerStudentsToTeachertDto.teacherEmail} not found`,
      );
    }

    const students = await Promise.all(
      registerStudentsToTeachertDto.studentEmails.map(async (studentEmail) => {
        const student = await this.studentRepository.findOne({
          where: { email: studentEmail },
        });

        if (!student) {
          throw new NotFoundException(
            `Stduent with the email ${studentEmail} not found`,
          );
        }
        return student;
      }),
    );

    teacher.students = students;
    await this.teacherRepository.save(teacher);
  }

  // retrieve students who are registered to ALL of the given teachers
  async retriveCommonStudents(teachersEmail: string[]): Promise<string[]> {
    const teachers = await this.teacherRepository.find({
      where: { email: In(teachersEmail) }, // Use In operator
    });

    const teacherIds = teachers.map((teacher) => teacher.id);
    // console.log('Teacher id ===========>', teacherIds);

    const students = await this.studentRepository
      .createQueryBuilder('student')
      .innerJoin('student.teachers', 'teacher')
      .where('teacher.id IN (:...teacherIds)', { teacherIds })
      .getMany();
    const studentEmails = students.map((student) => student.email);

    return studentEmails;
  }

  // create teacher
  async create(createTeacherDto: CreateTeacherDto): Promise<TeacherEntity> {
    const teacher = this.teacherRepository.create(createTeacherDto);
    return this.teacherRepository.save(teacher);
  }

  // find all teacher
  async findAll(): Promise<TeacherEntity[]> {
    return await this.teacherRepository.find();
  }

  //  find teacher
  async findOne(id: number): Promise<TeacherEntity> {
    return await this.teacherRepository.findOne({ where: { id: id } });
  }

  // update teacher
  async update(
    id: number,
    updateTeacherDto: UpdateTeacherDto,
  ): Promise<TeacherEntity> {
    const teacher = await this.teacherRepository.findOne({ where: { id: id } });
    this.teacherRepository.merge(teacher, updateTeacherDto);
    return this.teacherRepository.save(teacher);
  }

  // remove teacher
  async remove(id: number): Promise<void> {
    await this.teacherRepository.delete(id);
  }
}
