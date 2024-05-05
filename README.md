# NodeJS API Assessment

## Background
Teachers need a system where they can perform administrative functions for their students. Teachers and students are identified by their email addresses.


## Installation
1. Clone the repository:
   ```
   
   ```
2. Install dependencies:
   ```
   
   ```
3. Create a .env file:
   ```
   
   ```
4. Start the application:
   ```
   
   ```



## API Endpoints
| Endpoint |  HTTP Request Method|Description |
| --- | --- |--- |
| http://localhost:3000/api/register | POST | Register one or more students to a specified teacher. | 
| http://localhost:3000/api/commonstudents | GET | List of students common to a given list of teachers. | 
| http://localhost:3000/api/suspend |  POST   | Suspend a specified student. |
| http://localhost:3000/api/retrievefornotifications |  POST | List of students who can receive a given notification. |



## Teachers CURD API Endpoints
| Endpoint | HTTP Request Method |Description | 
| --- | --- |--- |
| http://localhost:3000/api/teachers | POST| Create teacher. | 
| http://localhost:3000/api/teachers |  GET | List all teachers. | 
| http://localhost:3000/api/teachers/:id | GET | Get teacher by id. | 
| http://localhost:3000/api/teachers/:id |  PUT | Update teacher by teacher id. |
| http://localhost:3000/api/teachers/:id |  DELETE | Delete teacher by teacher id. |



## Students CURD API Endpoints
| Endpoint | HTTP Request Method| Description | 
| --- | --- |--- |
| http://localhost:3000/api/students | POST| Create student. |
| http://localhost:3000/api/students |  GET | List all students. | 
| http://localhost:3000/api/students/:id | GET | Get student by id. | 
| http://localhost:3000/api/students/:id | PUT | Update student by student id. | 
| http://localhost:3000/api/students/:id | DELETE | Delete student by student id. | 
