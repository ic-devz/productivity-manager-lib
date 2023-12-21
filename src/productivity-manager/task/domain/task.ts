import { AggregateRoot } from '../../../core/event/aggregate-root';
import { Person } from '../../person/domain/person';
import { ProjectId } from '../../project/domain/project-id';
import { TaskDeletedEvent } from './events/task-deleted.event';
import { Priority } from './priority';
import { TaskId } from './task-id';
import { TaskStatus } from './task-status';

export class Task extends AggregateRoot {
  protected constructor(
    private _id: TaskId,
    private _projectId: ProjectId,
    private _summary: string,
    private _taskTypeId: string,
    private _description: string,
    private _priority: Priority,
    private _status: TaskStatus,
    private _responsiblePerson: Person | null,
    private _informerPerson: Person | null,
    private _createdAt: Date | null,
    private _deletedAt: Date | null,
    private _updatedAt: Date | null
  ) {
    super();
  }

  get id(): TaskId {
    return this._id;
  }

  get projectId(): ProjectId {
    return this._projectId;
  }

  get summary(): string {
    return this._summary;
  }

  get taskTypeId(): string {
    return this._taskTypeId;
  }

  get description(): string {
    return this._description;
  }

  get priority(): Priority {
    return this._priority;
  }

  get status(): string {
    return this._status;
  }

  get responsiblePerson(): Person | null {
    return this._responsiblePerson;
  }

  get informerPerson(): Person | null {
    return this._informerPerson;
  }

  get createdAt(): Date | null {
    return this._createdAt;
  }

  get deletedAt(): Date | null {
    return this._deletedAt;
  }

  get updatedAt(): Date | null {
    return this._updatedAt;
  }

  get isDeleted(): boolean {
    return !!this._deletedAt;
  }

  static fromPrimitives(
    id: TaskId,
    projectId: ProjectId,
    summary: string,
    TaskTypeId: string,
    description: string,
    priority: Priority,
    status: TaskStatus,
    responsiblePersonId: Person | null,
    informerPersonId: Person | null,
    createdAt: Date | null,
    deletedAt: Date | null,
    updatedAt: Date | null
  ): Task {
    return new Task(
      id,
      projectId,
      summary,
      TaskTypeId,
      description,
      priority,
      status,
      responsiblePersonId,
      informerPersonId,
      createdAt,
      deletedAt,
      updatedAt
    );
  }

  static create(
    projectId: ProjectId,
    summary: string,
    TaskTypeId: string,
    description: string,
    priority: Priority,
    responsiblePersonId: Person | null,
    informerPersonId: Person | null
  ): Task {
    return new Task(
      TaskId.next(),
      projectId,
      summary,
      TaskTypeId,
      description,
      priority,
      TaskStatus.BACKLOG,
      responsiblePersonId,
      informerPersonId,
      new Date(),
      null,
      new Date()
    );
  }

  markAsDeleted(): void {
    this._deletedAt = new Date();
    this._updatedAt = new Date();

    this.apply(new TaskDeletedEvent(this.id.value));
  }

  changeResponsiblePerson(responsiblePerson: Person | null): void {
    this._responsiblePerson = responsiblePerson;
  }

  changeInformerPerson(informerPerson: Person | null): void {
    this._informerPerson = informerPerson;
  }

  changeStatus(status: TaskStatus): void {
    this._status = status;
  }
}
