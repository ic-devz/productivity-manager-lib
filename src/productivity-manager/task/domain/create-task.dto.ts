import { PersonId } from '../../person/domain/person-id';
import { ProjectId } from '../../project/domain/project-id';
import { Priority } from './priority';

export interface CreateTaskDto {
  projectId: ProjectId;
  summary: string;
  taskTypeId: string;
  description: string;
  priority: Priority;
  responsibleId?: PersonId | null;
  informerId?: PersonId | null;
}
