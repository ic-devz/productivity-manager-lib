import { DomainEvent } from './domain-event';

export interface DomainEventSubscriber {
  handle(event: DomainEvent): void;
}
