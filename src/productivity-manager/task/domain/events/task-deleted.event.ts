import { DomainEvent } from '../../../../core/event/domain-event';
import { Person } from '../../../person/domain/person';
import { Task } from '../task';

export class TaskDeletedEvent implements DomainEvent {
  dateTimeOccurred: Date;

  constructor(public readonly task: Task, public readonly deletedBy: Person) {
    this.dateTimeOccurred = new Date();
  }

  getAggregateId(): string {
    return this.task.id.value;
  }
}
