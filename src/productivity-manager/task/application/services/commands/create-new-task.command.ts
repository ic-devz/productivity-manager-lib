import { Command } from '../../../../../core/command/command';
import { CreateTaskDto } from '../../../domain/create-task.dto';

export class CreateNewTaskCommand implements Command {
  aggregateId: string;

  constructor(public readonly task: CreateTaskDto) {
    this.aggregateId = '';
  }
}
