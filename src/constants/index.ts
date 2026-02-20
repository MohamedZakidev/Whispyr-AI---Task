import type { LogLineType } from '../types';

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

export const logsData = originalLogsData.split('\n') as LogLineType[];
