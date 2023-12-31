import { CommandHandler } from '../../../../../../core/command/command-handler';
import { EventPublisher } from '../../../../../../core/event/event-publisher';
import { Person } from '../../../../../person/domain/person';
import { TaskRepository } from '../../../../domain/task.repository';
import { DeleteTaskCommand } from './delete-task.command';

export class DeleteTaskHandler implements CommandHandler<DeleteTaskCommand> {
  constructor(
    private readonly taskRepository: TaskRepository,
    private readonly eventPublisher: EventPublisher
  ) {}

  async handle(command: DeleteTaskCommand): Promise<any> {
    let task = await this.taskRepository.findById(command.id);
    if (!task) {
      throw new Error('Task not found');
    }

    task.markAsDeleted(
      new Person('1213131', 'Ivan Chavez', 'ichavez', 'ichavez9001@gmail.com')
    );

    this.eventPublisher.commit(task);

    return task;
  }
}
