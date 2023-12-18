import { PersonId } from '../../person/domain/person-id';
import { ProjectId } from '../../project/domain/project-id';
import { Priority } from './priority';
import { TaskId } from './task-id';

export class Task {
  protected constructor(
    public readonly id: TaskId,
    public readonly projectId: ProjectId,
    public readonly summary: string,
    public readonly TaskTypeId: string,
    public readonly description: string,
    public readonly priority: Priority,
    public readonly status: string,
    public readonly responsiblePersonId: PersonId | null,
    public readonly informerPersonId: PersonId | null,
    public readonly createdAt: Date | null,
    public readonly deletedAt: Date | null,
    public readonly updatedAt: Date | null
  ) {}

  static fromPrimitives(
    id: TaskId,
    projectId: ProjectId,
    summary: string,
    TaskTypeId: string,
    description: string,
    priority: Priority,
    status: string,
    responsiblePersonId: PersonId | null,
    informerPersonId: PersonId | null,
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
    status: string,
    responsiblePersonId: PersonId | null,
    informerPersonId: PersonId | null
  ): Task {
    return new Task(
      TaskId.next(),
      projectId,
      summary,
      TaskTypeId,
      description,
      priority,
      status,
      responsiblePersonId,
      informerPersonId,
      new Date(),
      null,
      new Date()
    );
  }

  markAsDeleted(): Task {
    return new Task(
      this.id,
      this.projectId,
      this.summary,
      this.TaskTypeId,
      this.description,
      this.priority,
      this.status,
      this.responsiblePersonId,
      this.informerPersonId,
      this.createdAt,
      new Date(),
      new Date()
    );
  }
}
