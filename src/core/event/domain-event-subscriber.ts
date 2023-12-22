import { DomainEvent } from './domain-event';

export interface DomainEventSubscriber<K extends DomainEvent> {
  handle(event: K): void;
}
