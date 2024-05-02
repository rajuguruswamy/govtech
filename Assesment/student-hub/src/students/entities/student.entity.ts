import { Entity, Column, PrimaryGeneratedColumn, ManyToMany } from 'typeorm';
import { TeacherEntity } from '../../teachers/entities/teacher.entity';

@Entity('student')
export class StudentEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column({ unique: true })
  name: string;

  @Column({ default: false, nullable: false })
  isSuspended: boolean;

  @ManyToMany(() => TeacherEntity, (teacher) => teacher.students)
  teachers: TeacherEntity[];
}
