import { CreateTaskDto } from '../../domain/create-task.dto';
import { TaskId } from '../../domain/task-id';
import { TaskRepository } from '../../domain/task.repository';

export class TaskEditor {
  constructor(private readonly taskRepository: TaskRepository) {}

  async execute(taskId: TaskId, updateTask: CreateTaskDto) {
    let task = await this.taskRepository.findById(taskId);
    if (!task) {
      throw new Error('Task not found');
    }

    return this.taskRepository.update(taskId, updateTask);
  }
}
