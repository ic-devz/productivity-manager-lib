import { TaskId } from '../../domain/task-id';
import { TaskRepository } from '../../domain/task.repository';

export class DeleteTask {
  constructor(private readonly taskRepository: TaskRepository) {}

  async execute(taskId: TaskId) {
    let task = await this.taskRepository.findById(taskId);
    if (!task) {
      throw new Error('Task not found');
    }

    return this.taskRepository.delete(taskId);
  }
}
