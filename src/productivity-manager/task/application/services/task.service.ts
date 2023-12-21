import { EventPublisher } from '../../../../core/event/event-publisher';
import { CreateTaskDto } from '../../domain/create-task.dto';
import { TaskId } from '../../domain/task-id';
import { TaskRepository } from '../../domain/task.repository';

export class TaskService {
  constructor(
    private readonly taskRepository: TaskRepository,
    private readonly eventPublisher: EventPublisher
  ) {}

  async findById(taskId: TaskId) {
    return this.taskRepository.findById(taskId);
  }

  async create(task: CreateTaskDto) {
    let savedTask = await this.taskRepository.save(task);
    this.eventPublisher.commit(savedTask);
  }

  async delete(taskId: TaskId) {
    let task = await this.taskRepository.findById(taskId);

    if (!task) {
      throw new Error('Task not found');
    }

    task.markAsDeleted();
    this.eventPublisher.commit(task);
  }
}
