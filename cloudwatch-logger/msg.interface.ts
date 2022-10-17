import { LogLevel } from '@nestjs/common';

export interface msg_IF {
  index: string;
  message: string;
  object: any;
  severity: LogLevel;
}
