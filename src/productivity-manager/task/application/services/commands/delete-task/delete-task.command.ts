import { Command } from '../../../../../../core/command/command';
import { TaskId } from '../../../../domain/task-id';

export class DeleteTaskCommand implements Command {
  aggregateId: string;
  constructor(public readonly id: TaskId) {
    this.aggregateId = id.value;
  }
}
