import { LoggerInterface } from './logger.interface.js';

export default class ConsoleLogger implements LoggerInterface {
  public debug(message: string, ...args: unknown[]): void {
    console.debug(message, ...args);
  }

  public info(message: string, ...args: unknown[]): void {
    console.info(message, ...args);
  }

  public warn(message: string, ...args: unknown[]): void {
    console.warn(message, ...args);
  }

  public error(message: string, ...args: unknown[]): void {
    console.error(message, ...args);
  }
}
