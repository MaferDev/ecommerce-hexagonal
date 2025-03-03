export class Logger {
  private enableDebug: boolean;
  private context: string = '';
  constructor(enableDebug = false) {
    this.enableDebug = enableDebug;
  }
  set(context: string) {
    this.context = context;
  }

  log(level: string, message: string, body?: any) {
    const timestamp = new Date().toISOString();
    message = typeof message === 'string' ? message : JSON.stringify(message);
    const logMessage = `[${timestamp}][${this.context}][${level.toUpperCase()}] ${message}`;
    console.log(logMessage);
    body && console.log(body);
  }

  info(message: string, body: Record<string, unknown>) {
    this.log('info', message, body);
  }

  warn(message: string, body: Record<string, unknown>) {
    this.log('warn', message, body);
  }

  error(message: string, body: Record<string, unknown>) {
    this.log('error', message, body);
  }

  debug(message: string, body: Record<string, unknown>) {
    if (this.enableDebug) {
      this.log('debug', message, body);
    }
  }
}

module.exports = Logger;
