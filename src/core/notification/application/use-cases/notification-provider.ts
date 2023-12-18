import { NotificationDto } from '../../domain/notification.dto';

export interface NotificationProvider {
  send(notification: NotificationDto): Promise<void>;
}
