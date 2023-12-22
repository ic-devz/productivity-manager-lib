import * as _ from 'lodash';

export class MailDto {
  constructor(
    public readonly id: string,
    public readonly templateName: string,
    public readonly subject: string,
    public readonly body: string
  ) {}

  replaceVariables(data: any): MailDto {
    var compliled = _.template(this.subject);
    let subject = compliled(data);
    var bodyCompliled = _.template(this.body);
    let body = bodyCompliled(data);

    return new MailDto(this.id, this.templateName, subject, body);
  }
}
