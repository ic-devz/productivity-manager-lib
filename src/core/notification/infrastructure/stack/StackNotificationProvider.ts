import { NotificationProvider } from '../../application/use-cases/notification-provider';
import { NotificationDto } from '../../domain/notification.dto';

export class StackNotificationProvider implements NotificationProvider {
  constructor(private readonly providers: NotificationProvider[]) {}

  async send(notification: NotificationDto): Promise<void> {
    this.providers.forEach(async provider => {
      await provider.send(notification);
    });
  }
}
