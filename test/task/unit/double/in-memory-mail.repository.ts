import { MailDto } from '../../../../src/core/mail/mail.dto';
import { MailRepository } from '../../../../src/core/mail/mail.repository';

export class InMemoryMailRepository implements MailRepository {
  private _mails: MailDto[] = [];

  async findByTemplateName(templateName: string): Promise<MailDto | null> {
    let mail = this._mails.find(mail => mail.templateName === templateName);

    if (!mail) {
      return Promise.resolve(null);
    }

    return Promise.resolve(mail);
  }

  async save(mail: MailDto): Promise<void> {
    this._mails.push(mail);
  }
}
