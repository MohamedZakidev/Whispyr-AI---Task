type LevelType = 'INFO' | 'WARN' | 'ERROR' | 'DEBUG';
type serviceType = 'auth' | 'db' | 'cache' | 'api';

type ServiceTagType = `[service:${serviceType}]`;
type SessionIdTagType = `[session:${string}]`;

export type LogLineType =
  `[${string}] [${LevelType}] ${`${ServiceTagType}` | ''} ${`${SessionIdTagType}` | ''}${string}`;

export type Counter = {
  [K in `[${LevelType}]`]: number;
};
