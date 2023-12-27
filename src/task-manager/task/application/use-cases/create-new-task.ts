import { CreateTaskDto } from '../../domain/create-task.dto';
import { Task } from '../../domain/task';
import { TaskRepository } from '../../domain/task.repository';

export class CreateNewTask {
  constructor(private readonly taskRepository: TaskRepository) {}
  execute(createTaskDto: CreateTaskDto): Promise<Task> {
    return this.taskRepository.save(createTaskDto);
  }
}
