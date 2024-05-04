import { DataSource } from 'typeorm';
import { dataSourceOptions } from '../datasource/data-source';
import { TeacherEntity } from '../teachers/entities/teacher.entity';
import { StudentEntity } from '../students/entities/student.entity';

const dataSource = new DataSource(dataSourceOptions);
const teacherRepository = dataSource.getRepository(TeacherEntity);
const studentRepository = dataSource.getRepository(StudentEntity);

async function connect() {
  try {
    if (dataSource.isInitialized) {
      await dataSource.destroy();
    }
    await dataSource.initialize();
    console.log('Database connected successfully');
  } catch (error) {
    console.log('Error connecting to database', error);
  }
}

async function disconnect() {
  try {
    await dataSource.destroy();
    console.log('Database disconnected successfully');
  } catch (error) {
    console.log('Error when disconnecting from database', error);
  }
}

async function seed() {
  // seed teacher data
  const teacherSeed = () => [
    {
      email: 'teacher1@gmail.com',
    },
    {
      email: 'teacher2@gmail.com',
    },
    {
      email: 'teacherken@gmail.com',
    },
    {
      email: 'teacherjoe@gmail.com',
    },
  ];

  // seed student  data
  const studentSeed = () => [
    {
      email: 'student1@gmail.com',
    },
    {
      email: 'student2@gmail.com',
    },
    {
      email: 'student3@gmail.com',
    },
    {
      email: 'student4@gmail.com',
    },
    {
      email: 'student5@gmail.com',
    },
    {
      email: 'student6@gmail.com',
    },

    {
      email: 'studentbob@example.com',
    },

    {
      email: 'studentagnes@example.com',
    },
    {
      email: 'studentmiche@example.com',
    },
    {
      email: 'studentmary@gmail.com',
    },
    {
      email: 'commonstudent1@gmail.com',
    },
    {
      email: 'commonstudent2@gmail.com',
    },
    {
      email: 'student_only_under_teacher_ken@gmail.com',
    },
  ];

  await teacherRepository.save(teacherSeed());
  await studentRepository.save(studentSeed());
  console.log('created teacher and student seed');
}

async function runSeed() {
  await connect();
  console.log('database connected!');
  await seed();
  console.log('data seed done!');
  await disconnect();
  console.log('database disconnected!');
}

runSeed();
