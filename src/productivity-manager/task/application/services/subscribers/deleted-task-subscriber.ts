import { DomainEventSubscriber } from '../../../../../core/event/domain-event-subscriber';
import { MailProvider } from '../../../../../core/mail/mail.provider';
import { MailRepository } from '../../../../../core/mail/mail.repository';
import { TaskDeletedEvent } from '../../../domain/events/task-deleted.event';
import { TaskRepository } from '../../../domain/task.repository';

export class DeletedTaskSubscriber
  implements DomainEventSubscriber<TaskDeletedEvent> {
  constructor(
    private readonly _taskRepository: TaskRepository,
    private readonly mailProvider: MailProvider,
    private readonly mailRepository: MailRepository,
    private readonly fromEmail: string
  ) {}

  async handle(event: TaskDeletedEvent): Promise<void> {
    this._taskRepository.delete(event.task.id);
    let mail = await this.mailRepository.findByTemplateName('task-deleted');

    if (mail) {
      let mailReplaced = mail.replaceVariables({
        task: event.task,
      });

      await this.mailProvider.send({
        from: this.fromEmail,
        to: event.task.watchers.map(watcher => watcher.email),
        subject: mailReplaced.subject,
        body: mailReplaced.body,
      });
    }
  }
}
