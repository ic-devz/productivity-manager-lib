import { PersonId } from '../../../src/productivity-manager/person/domain/person-id';
import { ProjectId } from '../../../src/productivity-manager/project/domain/project-id';
import { CreateNewTask } from '../../../src/productivity-manager/task/application/use-cases/create-new-task';
import { Priority } from '../../../src/productivity-manager/task/domain/priority';
import { InMemoryTaskRepository } from './double/in-memory-task.repository';

describe('create new task', () => {
  it('an user should be create new task', async () => {
    let createNewTaskProcessor = new CreateNewTask(
      new InMemoryTaskRepository()
    );

    let task = await createNewTaskProcessor.execute({
      summary: 'title',
      description: 'description',
      priority: Priority.High,
      status: 'pending',
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
    expect(task.status).toBe('pending');
  });
});
