import { MailDto } from './mail.dto';

export interface MailRepository {
  findByTemplateName(templateName: string): Promise<MailDto | null>;
}
