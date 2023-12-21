import { AggregateRoot } from './aggregate-root';
import { DomainEvent } from './domain-event';

export class EventPublisher {
  publish(event: DomainEvent) {
    console.log(`Event published: ${event.getAggregateId()}`);
  }

  commit(aggregateRoot: AggregateRoot) {
    aggregateRoot.domainEvents.forEach(event => this.publish(event));
  }
}
