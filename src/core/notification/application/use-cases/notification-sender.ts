import { NotificationProvider } from './notification-provider';

export class NotificationSender {
  constructor(private readonly notificationProvider: NotificationProvider) {}

  async execute(notification: Notification): Promise<void> {
    await this.notificationProvider.send(notification);
  }
}
