import { Person } from '../../person/domain/person';
import { ProjectId } from '../../project/domain/project-id';
import { Priority } from './priority';

export interface CreateTaskDto {
  projectId: ProjectId;
  summary: string;
  taskTypeId: string;
  description: string;
  priority: Priority;
  responsible: Person | null;
  informer: Person | null;
}
