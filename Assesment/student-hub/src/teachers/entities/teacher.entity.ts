import {
  Entity,
  Column,
  ManyToMany,
  PrimaryGeneratedColumn,
  JoinTable,
} from 'typeorm';
import { StudentEntity } from '../../students/entities/student.entity';

@Entity('teacher')
export class TeacherEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  name: string;

  @ManyToMany(() => StudentEntity, (student) => student.teachers)
  @JoinTable({
    name: 'teacher_student',
    joinColumn: {
      name: 'teacher_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'student_id',
      referencedColumnName: 'id',
    },
  })
  students: StudentEntity[];
}
