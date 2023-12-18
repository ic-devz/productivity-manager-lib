import { ProjectId } from '../../../src/productivity-manager/project/domain/project-id';
import { TaskEditor } from '../../../src/productivity-manager/task/application/use-cases/task-editor';
import { Priority } from '../../../src/productivity-manager/task/domain/priority';
import { TaskId } from '../../../src/productivity-manager/task/domain/task-id';
import { InMemoryTaskRepository } from './double/in-memory-task.repository';

describe('update task', () => {
  it('an user should be update task', async () => {
    let taskEditor = new TaskEditor(new InMemoryTaskRepository());
    let taskId = TaskId.fromPrimitive('1');
    let task = await taskEditor.execute(taskId, {
      projectId: ProjectId.next(),
      summary: 'title',
      taskTypeId: '1',
      description: 'description',
      priority: Priority.High,
      status: 'pending',
    });

    expect(task).not.toBeNull();
    expect(task.id).not.toBeNull();
  });
});
