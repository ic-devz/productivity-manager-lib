import { CommandBus } from '../../../src/core/command/command-bus';
import { EventPublisher } from '../../../src/core/event/event-publisher';
import { DeleteTaskHandler } from '../../../src/productivity-manager/task/application/services/commands/delete-task/delete-task.handler';
import { TaskService } from '../../../src/productivity-manager/task/application/services/task.service';
import { TaskId } from '../../../src/productivity-manager/task/domain/task-id';
import { InMemoryTaskRepository } from './double/in-memory-task.repository';
import { DeletedTaskSubscriber } from '../../../src/productivity-manager/task/application/services/subscribers/deleted-task-subscriber';
import { LogMailProvider } from '../../../src/core/mail/log-mail.provider';
import { InMemoryMailRepository } from './double/in-memory-mail.repository';
import { MailDto } from '../../../src/core/mail/mail.dto';

describe('Delete Task', () => {
  it('should delete a task', async () => {
    let taskRepository = new InMemoryTaskRepository();
    let eventPublisher = new EventPublisher();
    let mailRepository = new InMemoryMailRepository();

    let deletedTaskMail = new MailDto(
      '1',
      'task-deleted',
      'La tarea <%= task.id.value %> eliminada',
      '<%= task.deletedBy?.name %> ha eliminado la tarea <%= task.id.value %>'
    );

    mailRepository.save(deletedTaskMail);

    eventPublisher.subscribe(
      'TaskDeletedEvent',
      new DeletedTaskSubscriber(
        taskRepository,
        new LogMailProvider(),
        mailRepository,
        'project@octopods.io'
      )
    );
    let commandBus = new CommandBus();

    commandBus.register(
      'DeleteTaskCommand',
      new DeleteTaskHandler(taskRepository, eventPublisher)
    );

    let taskService = new TaskService(taskRepository, commandBus);
    let task = await taskService.delete(TaskId.fromPrimitive('1'));

    expect(task.id.value).toBe('1');
    expect(task.isDeleted).toBe(true);
  });
});
