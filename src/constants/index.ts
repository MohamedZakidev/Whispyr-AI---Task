import type { LogEntry, serviceType } from '../types';

const originalLogsData = `[2024-03-12 10:00:03] [INFO] [service:auth] [session:abc123] User login successful
[2024-03-12 10:05:44] [WARN] [service:db] High response time detected
[2024-03-12 10:06:02] [ERROR] [service:db] DB connection timeout
[2024-03-12 10:06:05] [ERROR] [service:db] DB connection timeout
[2024-03-12 10:07:11] [ERROR] [service:auth] Auth service failed – could not reach DB
[2024-03-12 10:07:14] [ERROR] [service:auth] [session:abc123] Session validation failed
[2024-03-12 10:07:20] [INFO] [service:cache] Falling back to cache layer
[2024-03-12 10:08:30] [WARN] [service:cache] Cache hit rate degraded
[2024-03-12 10:09:02] [INFO] [service:db] DB connection restored
[2024-03-12 10:10:15] [INFO] [service:auth] Services resuming normal operation
[2024-03-12 10:12:00] [INFO] [service:auth] [session:xyz789] User login successful
[2024-03-12 10:12:45] [DEBUG] [service:api] Incoming request: GET /dashboard
[2024-03-12 11:00:10] [INFO] [service:api] Scheduled job started
[2024-03-12 11:01:33] [ERROR] [service:api] Job failed: timeout
[2024-03-12 11:02:00] [INFO] [service:api] Retrying job
[2024-03-12 11:02:45] [INFO] [service:api] Job completed successfully`;

const logsData = originalLogsData.split('\n');

function parseLogLines() {
  return logsData.map((log) => {
    const parts = log.split('] ').map((part: string) => part.replace(/^\[|\]$/g, ''));

    const timestamp = parts[0]; // "2024-03-12 10:00:03"
    const level = parts[1] as LogEntry['level'];

    // Optional service/session
    let serviceType: serviceType | undefined;
    let sessionId: string | undefined;

    let messageIndex = 2;

    if (parts[2]?.startsWith('service:')) {
      serviceType = parts[2].split(':')[1] as serviceType;
      messageIndex++;
    }

    if (parts[3]?.startsWith('session:')) {
      sessionId = parts[3].split(':')[1];
      messageIndex++;
    }

    // The message is the rest of the string (joining in case it had extra "]")
    const message = log.split(']').slice(messageIndex).join(']').trim();

    return { timestamp, level, serviceType, sessionId, message };
  });
}

export const parsedLogs: LogEntry[] = parseLogLines();
