import { BadRequestException, PipeTransform } from '@nestjs/common';
import { TaskStatus } from '../task-status.enum';

class TaskStatusValidationPipe implements PipeTransform {
  transform(value: TaskStatus) {
    if (!Object.keys(TaskStatus).includes(value)) {
      throw new BadRequestException(`"${value}" is an invalid status.`)
    }

    return value;
  }
}

export { TaskStatusValidationPipe}