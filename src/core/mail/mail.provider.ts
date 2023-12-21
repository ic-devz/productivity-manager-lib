export interface MailProvider {
  send(to: string, subject: string, body: string): Promise<void>;
}
