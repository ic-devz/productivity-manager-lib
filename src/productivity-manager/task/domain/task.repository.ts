import { CreateTaskDto } from './create-task.dto';
import { Task } from './task';
import { TaskId } from './task-id';

export interface TaskRepository {
  findById(id: TaskId): Promise<Task | null>;
  save(task: CreateTaskDto): Promise<Task>;
  update(taskId: TaskId, task: CreateTaskDto): Promise<Task>;
  delete(taskId: TaskId): Promise<TaskId>;
}
