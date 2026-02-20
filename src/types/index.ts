export type LevelType = 'INFO' | 'WARN' | 'ERROR' | 'DEBUG';
export type serviceType = 'auth' | 'db' | 'cache' | 'api';

export type LogEntry = {
  timestamp: string; // "2024-03-12 10:00:03"
  level: LevelType;
  serviceType?: serviceType; // optional, e.g., "auth"
  sessionId?: string; // optional, e.g., "abc123"
  message: string; // "User login successful"
};
