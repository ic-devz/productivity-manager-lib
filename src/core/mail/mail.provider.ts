import { Mail } from './mail';

export interface MailProvider {
  send(mail: Mail): Promise<void>;
}
