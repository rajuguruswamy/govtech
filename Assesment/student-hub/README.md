# NodeJS API Assessment

## Background

Teachers need a system where they can perform administrative functions for their students. Teachers and students are identified by their email addresses.

## Installation

1. Clone the repository:

   ```
      git clone https://github.com/rajuguruswamy/govtech.git
   ```

2. Install dependencies:

   ```
      cd ./govtech/Assesment/student-hub/
      npm install

   ```

3. Please open the setenv_localpostgres.sh file located in the src/scripts directory, and assign values to the DATABASE_USERNAME, DATABASE_PASSWORD, and DATABASE_NAME variables.

   ```
      export DATABASE_HOSTNAME=localhost
      export DATABASE_PORT=5432
      export DATABASE_USERNAME=
      export DATABASE_PASSWORD=
      export DATABASE_NAME=
      export NODE_PORT=3000
      export NODE_ENV=DEV

   ```

4. Start db server:

   ```
      npm run start:dev:db

   ```

5. Create tables schema and seed data:

   ```
      npm run start:dev:seed

   ```

6. Start the application:

   ```
      npm run start:dev

   ```

7. check if a application server is running :

   ```
    http://localhost:3000/

   ```

8. run e2e test:

   ```
      npm run test:e2e

   ```

9. run unit test:

   ```
      npm run test

   ```

## API Endpoints

| Endpoint                                           | HTTP Request Method | Description                                            |
| -------------------------------------------------- | ------------------- | ------------------------------------------------------ |
| http://localhost:3000/api/register                 | POST                | Register one or more students to a specified teacher.  |
| http://localhost:3000/api/commonstudents?teacher=  | GET                 | List of students common to a given list of teachers.   |
| http://localhost:3000/api/suspend                  | POST                | Suspend a specified student.                           |
| http://localhost:3000/api/retrievefornotifications | POST                | List of students who can receive a given notification. |

## Teachers CURD API Endpoints

| Endpoint                               | HTTP Request Method | Description                   |
| -------------------------------------- | ------------------- | ----------------------------- |
| http://localhost:3000/api/teachers     | POST                | Create teacher.               |
| http://localhost:3000/api/teachers     | GET                 | List all teachers.            |
| http://localhost:3000/api/teachers/:id | GET                 | Get teacher by id.            |
| http://localhost:3000/api/teachers/:id | PUT                 | Update teacher by teacher id. |
| http://localhost:3000/api/teachers/:id | DELETE              | Delete teacher by teacher id. |

## Students CURD API Endpoints

| Endpoint                               | HTTP Request Method | Description                   |
| -------------------------------------- | ------------------- | ----------------------------- |
| http://localhost:3000/api/students     | POST                | Create student.               |
| http://localhost:3000/api/students     | GET                 | List all students.            |
| http://localhost:3000/api/students/:id | GET                 | Get student by id.            |
| http://localhost:3000/api/students/:id | PUT                 | Update student by student id. |
| http://localhost:3000/api/students/:id | DELETE              | Delete student by student id. |
