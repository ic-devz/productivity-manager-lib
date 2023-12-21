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
    let savedTask = this.taskRepository.save(task);
    this.eventPublisher.publish(savedTask);
  }
}
