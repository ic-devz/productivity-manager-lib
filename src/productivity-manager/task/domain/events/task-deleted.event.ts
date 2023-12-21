import { DomainEvent } from '../../../../core/event/domain-event';

export class TaskDeletedEvent implements DomainEvent {
  dateTimeOccurred: Date;
  taskId: string;

  constructor(taskId: string) {
    this.dateTimeOccurred = new Date();
    this.taskId = taskId;
  }

  getAggregateId(): string {
    return this.taskId;
  }
}
