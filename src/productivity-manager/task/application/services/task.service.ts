import { CommandBus } from '../../../../core/command/command-bus';
import { CreateTaskDto } from '../../domain/create-task.dto';
import { Task } from '../../domain/task';
import { TaskId } from '../../domain/task-id';
import { TaskRepository } from '../../domain/task.repository';
import { CreateNewTaskCommand } from './commands/create-new-task/create-new-task.command';
import { DeleteTaskCommand } from './commands/delete-task/delete-task.command';

export class TaskService {
  constructor(
    private readonly taskRepository: TaskRepository,
    private readonly commandBus: CommandBus
  ) {}

  async findById(taskId: TaskId) {
    return this.taskRepository.findById(taskId);
  }

  async create(task: CreateTaskDto): Promise<Task> {
    return this.commandBus.dispatch(new CreateNewTaskCommand(task));
  }

  async delete(taskId: TaskId): Promise<Task> {
    return this.commandBus.dispatch(new DeleteTaskCommand(taskId));
  }
}
