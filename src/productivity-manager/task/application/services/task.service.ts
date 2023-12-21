import { CommandBus } from '../../../../core/command/command-bus';
import { EventPublisher } from '../../../../core/event/event-publisher';
import { CreateTaskDto } from '../../domain/create-task.dto';
import { Task } from '../../domain/task';
import { TaskId } from '../../domain/task-id';
import { TaskRepository } from '../../domain/task.repository';
import { CreateNewTaskCommand } from './commands/create-new-task/create-new-task.command';

export class TaskService {
  constructor(
    private readonly taskRepository: TaskRepository,
    private readonly commandBus: CommandBus,
    private readonly eventPublisher: EventPublisher
  ) {}

  async findById(taskId: TaskId) {
    return this.taskRepository.findById(taskId);
  }

  async create(task: CreateTaskDto): Promise<Task> {
    return this.commandBus.dispatch(new CreateNewTaskCommand(task));
  }

  async delete(taskId: TaskId): Promise<Task> {
    let task = await this.taskRepository.findById(taskId);

    if (!task) {
      throw new Error('Task not found');
    }

    task.markAsDeleted();
    await this.eventPublisher.commit(task);

    return task;
  }
}
