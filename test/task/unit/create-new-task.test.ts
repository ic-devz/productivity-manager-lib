import { PersonId } from '../../../src/productivity-manager/person/domain/person-id';
import { ProjectId } from '../../../src/productivity-manager/project/domain/project-id';
import { Priority } from '../../../src/productivity-manager/task/domain/priority';
import { InMemoryTaskRepository } from './double/in-memory-task.repository';
import { TaskService } from '../../../src/productivity-manager/task/application/services/task.service';
import { EventPublisher } from '../../../src/core/event/event-publisher';
import { CommandBus } from '../../../src/core/command/command-bus';
import { CreateNewTaskHandler } from '../../../src/productivity-manager/task/application/services/commands/create-new-task/create-new-task.handler';
import { TaskStatus } from '../../../src/productivity-manager/task/domain/task-status';

describe('create new task', () => {
  it('an user should be create new task', async () => {
    let taskRepository = new InMemoryTaskRepository();
    let eventPublisher = new EventPublisher();
    let commandBus = new CommandBus();
    commandBus.register(
      'CreateNewTaskCommand',
      new CreateNewTaskHandler(taskRepository, eventPublisher)
    );

    let taskService = new TaskService(taskRepository, commandBus);

    let task = await taskService.create({
      summary: 'title',
      description: 'description',
      priority: Priority.High,
      projectId: ProjectId.next(),
      taskTypeId: '1',
      informerId: PersonId.next(),
      responsibleId: PersonId.next(),
    });

    expect(task).not.toBeNull();
    expect(task.id).not.toBeNull();
    expect(task.summary).toBe('title');
    expect(task.description).toBe('description');
    expect(task.priority).toBe(Priority.High);
    expect(task.status).toBe(TaskStatus.BACKLOG);
  });
});
