import { CommandHandler } from '../../../../../core/command/command-handler';
import { EventPublisher } from '../../../../../core/event/event-publisher';
import { TaskRepository } from '../../../domain/task.repository';
import { CreateNewTaskCommand } from './create-new-task.command';

export class CreateNewTaskHandler
  implements CommandHandler<CreateNewTaskCommand> {
  constructor(
    private readonly taskRepository: TaskRepository,
    private readonly eventPublisher: EventPublisher
  ) {}

  async handle(command: CreateNewTaskCommand): Promise<any> {
    let savedTask = await this.taskRepository.save(command.task);
    this.eventPublisher.commit(savedTask);

    return savedTask;
  }
}
