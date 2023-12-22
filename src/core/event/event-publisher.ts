import { AggregateRoot } from './aggregate-root';
import { DomainEvent } from './domain-event';
import { DomainEventSubscriber } from './domain-event-subscriber';

export class EventPublisher {
  private _subscribers: Map<
    string,
    DomainEventSubscriber<DomainEvent>
  > = new Map();

  public subscribe(
    domainName: string,
    subscriber: DomainEventSubscriber<DomainEvent>
  ): void {
    this._subscribers.set(domainName, subscriber);
  }

  publish(event: DomainEvent) {
    const domainName = event.constructor.name;
    const subscriber = this._subscribers.get(domainName);

    if (subscriber) {
      subscriber.handle(event);
    }
  }

  commit(aggregateRoot: AggregateRoot) {
    aggregateRoot.domainEvents.forEach(event => this.publish(event));
  }
}
