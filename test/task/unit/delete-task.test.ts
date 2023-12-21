import { CommandBus } from '../../../src/core/command/command-bus';
import { EventPublisher } from '../../../src/core/event/event-publisher';
import { DeleteTaskHandler } from '../../../src/productivity-manager/task/application/services/commands/delete-task/delete-task.handler';
import { TaskService } from '../../../src/productivity-manager/task/application/services/task.service';
import { TaskId } from '../../../src/productivity-manager/task/domain/task-id';
import { InMemoryTaskRepository } from './double/in-memory-task.repository';

describe('Delete Task', () => {
  it('should delete a task', async () => {
    let taskRepository = new InMemoryTaskRepository();
    let eventPublisher = new EventPublisher();
    let commandBus = new CommandBus();

    commandBus.register(
      'CreateNewTaskCommand',
      new DeleteTaskHandler(taskRepository, eventPublisher)
    );

    let taskService = new TaskService(
      taskRepository,
      commandBus,
      eventPublisher
    );

    let task = await taskService.delete(TaskId.fromPrimitive('1'));

    expect(task.id.value).toBe('1');
    expect(task.isDeleted).toBe(true);
  });
});
