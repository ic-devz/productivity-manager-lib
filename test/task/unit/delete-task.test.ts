import { InMemoryTaskRepository } from './double/in-memory-task.repository';
import { DeleteTask } from '../../../src/productivity-manager/task/application/use-cases/delete-task';
import { TaskId } from '../../../src/productivity-manager/task/domain/task-id';

describe('Delete Task', () => {
  it('should delete a task', async () => {
    let taskDeletor = new DeleteTask(new InMemoryTaskRepository());
    let taskId = await taskDeletor.execute(TaskId.fromPrimitive('1'));

    expect(taskId.value).toBe('1');
  });
});
