import { Task } from './task';
import { TaskId } from './task-id';

export interface TaskRepository {
  findById(id: TaskId): Promise<Task | null>;
  save(task: Task): Promise<Task>;
  update(taskId: TaskId, task: Task): Promise<Task>;
  delete(taskId: TaskId): Promise<TaskId>;
}
