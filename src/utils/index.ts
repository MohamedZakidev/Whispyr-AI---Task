import type { LogEntry, LevelType } from '../types';

export function getCountLogsPerLevel(logsData: LogEntry[]) {
  const counts = {} as { [K in LevelType]: number };
  logsData.forEach(({ level }) => {
    counts[level] = (counts[level] ?? 0) + 1;
  });
  return counts;
}

export function getMostFrequentErrorMessages(logsData: LogEntry[]) {
  const errorLogs = logsData.filter(({ level }) => level === 'ERROR');
  const counts: { [k in string]: number } = {};
  errorLogs.forEach(({ message }) => {
    counts[message] = (counts[message] ?? 0) + 1;
  });
  return Object.entries(counts)
    .map(([message, count]) => ({ message, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 3);
}

export function getPeakHour(logsData: LogEntry[]) {
  const counts: { [k in string]: number } = {};

  logsData.forEach(({ timestamp }) => {
    const hour = timestamp.split(' ')[1].split(':')[0];
    counts[hour] = (counts[hour] ?? 0) + 1;
  });
  const peekHour = Object.entries(counts).reduce(
    (prev, [hour, count]) => {
      return count > prev.count ? { hour, count } : prev;
    },
    { hour: '', count: 0 }
  );
  return peekHour;
}

export function getSessionLogsById(id: string, logsData: LogEntry[]) {
  return logsData.filter(({ sessionId }) => sessionId === id);
}

export function findErrorCascades(logsData: LogEntry[]) {
  // 1 Filter and sort ERROR logs
  const errorLogs = logsData
    .filter(({ level }) => level === 'ERROR')
    .sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());

  const cascades = [];
  let windowStart = 0;

  for (let i = 0; i < errorLogs.length; i++) {
    // Move window start forward until window is within 60 seconds
    while (
      windowStart < i &&
      new Date(errorLogs[i].timestamp).getTime() -
        new Date(errorLogs[windowStart].timestamp).getTime() >
        60_000
    ) {
      windowStart++;
    }

    const windowSize = i - windowStart + 1;

    if (windowSize >= 3) {
      const cascadeLogs = errorLogs.slice(windowStart, i + 1);
      cascades.push({
        start: cascadeLogs[0].timestamp,
        end: cascadeLogs[cascadeLogs.length - 1].timestamp,
        messages: cascadeLogs.map((log) => log.message),
      });
    }
  }

  return cascades;
}
