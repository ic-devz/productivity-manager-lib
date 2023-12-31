import { CreateTaskDto } from '../../../../src/productivity-manager/task/domain/create-task.dto';
import { Priority } from '../../../../src/productivity-manager/task/domain/priority';
import { Task } from '../../../../src/productivity-manager/task/domain/task';
import { TaskRepository } from '../../../../src/productivity-manager/task/domain/task.repository';
import { TaskId } from '../../../../src/productivity-manager/task/domain/task-id';
import { ProjectId } from '../../../../src/productivity-manager/project/domain/project-id';
import { TaskStatus } from '../../../../src/productivity-manager/task/domain/task-status';

export class InMemoryTaskRepository implements TaskRepository {
  delete(taskId: TaskId): Promise<TaskId> {
    return Promise.resolve(taskId);
  }

  update(taskId: TaskId, task: CreateTaskDto): Promise<Task> {
    return Promise.resolve(
      Task.fromPrimitives(
        taskId,
        task.projectId,
        task.summary,
        task.taskTypeId,
        task.description,
        task.priority,
        TaskStatus.BACKLOG,
        task.responsible || null,
        task.informer || null,
        new Date(),
        new Date(),
        new Date()
      )
    );
  }

  findById(id: TaskId): Promise<Task | null> {
    return Promise.resolve(
      Task.fromPrimitives(
        id,
        ProjectId.next(),
        'title',
        '1',
        'description',
        Priority.High,
        TaskStatus.BACKLOG,
        null,
        null,
        new Date(),
        new Date(),
        new Date()
      )
    );
  }

  save(task: CreateTaskDto): Promise<Task> {
    return Promise.resolve(
      Task.create(
        task.projectId,
        task.summary,
        task.taskTypeId,
        task.description,
        task.priority,
        task.responsible || null,
        task.informer || null
      )
    );
  }
}
