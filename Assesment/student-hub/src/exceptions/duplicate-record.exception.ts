import { ConflictException } from '@nestjs/common';

export class DuplicateRecordException extends ConflictException {
  constructor(message: string) {
    super(message);
  }
}
