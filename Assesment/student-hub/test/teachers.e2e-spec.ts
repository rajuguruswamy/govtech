import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { AppModule } from '../src/app.module';
import * as request from 'supertest';

describe('TeachersController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterEach(async () => {
    await app.close();
  });

  it('/api/register (POST)', async () => {
    const registerStudentsToTeacherDto = {
      teacherEmail: 'teacher1@gmail.com',
      studentEmails: ['student1@gmail.com', 'student2@gmail.com'],
    };

    return request(app.getHttpServer())
      .post('/api/register')
      .send(registerStudentsToTeacherDto)
      .expect(204);
  });

  it('/api/commonstudents (GET)', async () => {
    // Define your test scenario here
    const teacherEmail: string[] = ['teacher1@gmail.com'];
    return request(app.getHttpServer())
      .get('/api/commonstudents')
      .send(teacherEmail)
      .expect(200);
  });

  it('/api/suspend (POST)', async () => {
    const suspendStudentDto = {
      student: 'student1@gmail.com',
    };

    return request(app.getHttpServer())
      .post('/api/suspend')
      .send(suspendStudentDto)
      .expect(204);
  });

  it('/api/suspend (POST) when student does not exist should return 404', async () => {
    const suspendStudentDto = {
      student: 'student_notfound1@gmail.com',
    };

    return request(app.getHttpServer())
      .post('/api/suspend')
      .send(suspendStudentDto)
      .expect(404);
  });

  it('/api/retrievefornotifications (POST)', async () => {
    const notificationRequestDto = {
      teacher: 'teacher1@gmail.com',
      notification:
        'Hello students! @studentagnes@example.com @studentmiche@example.com',
    };
    return request(app.getHttpServer())
      .post('/api/retrievefornotifications')
      .send(notificationRequestDto)
      .expect(200);
  });

  it('/api/teachers (GET)', async () => {
    const res = await request(app.getHttpServer()).get('/api/teachers');
    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBe(true);
    res.body.forEach((teacher: any) => {
      expect(teacher).toHaveProperty('email');
    });
  });

  it('/api/teachers/1 (GET)', async () => {
    const expected = {
      id: 1,
      email: 'teacher1@gmail.com',
    };
    const res = await request(app.getHttpServer()).get('/api/teachers/1');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(expected);
  });
  // it('/api/teachers (POST)', async () => {
  //   const createTeacherDto = {
  //     email: 'newstudent@gmail.com',
  //   };
  //   const res = await request(app.getHttpServer())
  //     .post('/api/teachers')
  //     .send(createTeacherDto);

  //   expect(res.statusCode).toBe(201);
  // });

  //    it('/api/suspend should return statuscode 400 when post invalid student email, ', async () => {
  //      const suspendStudentDto = {
  //        student: 'student_invalid_emailgmail.com',
  //      };

  //      const res = await request(app.getHttpServer())
  //        .post('/api/suspend')
  //        .send(suspendStudentDto);

  //      expect(res.body).toEqual('student must be an email');
  //    });
});
