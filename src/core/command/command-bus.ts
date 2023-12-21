import { Command } from './command';
import { CommandHandler } from './command-handler';

export class CommandBus {
  private _handlers: Map<string, CommandHandler<Command>> = new Map();

  // TODO: implement command dispatcher

  register(commandName: string, handler: CommandHandler<Command>) {
    this._handlers.set(commandName, handler);
  }

  async dispatch(command: Command) {
    const commandName = command.constructor.name;
    const handler = this._handlers.get(commandName);
    if (!handler) {
      throw new Error(`Command handler not found [command=${commandName}]`);
    }
    return await handler.handle(command);
  }
}
