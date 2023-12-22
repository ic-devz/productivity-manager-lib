import { Mail } from './mail';
import { MailProvider } from './mail.provider';

export class LogMailProvider implements MailProvider {
  send(mail: Mail): Promise<void> {
    console.log(mail);
    return Promise.resolve();
  }
}
