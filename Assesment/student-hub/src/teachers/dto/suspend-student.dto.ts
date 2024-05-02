import { IsNotEmpty } from 'class-validator';

export class SuspendStudentDto {
  @IsNotEmpty()
  student: string;
}
