import type { Counter, LogLineType } from '../types';

export function getCountEnteriesPerLevel(logsData: LogLineType[]) {
  const counts: Partial<Counter> = {};

  logsData.forEach((log) => {
    const level = log.split(' ')[2] as keyof Counter;
    if (!counts[level]) {
      counts[level] = 1;
    } else {
      counts[level]++;
    }
  });
  return counts;
}

export function getMostFrequentErrorMessages(logsData: LogLineType[]) {
  const errorLogs = logsData.filter((log) => log.includes('[ERROR]'));

  const counts: { [k in string]: number } = {};

  errorLogs.forEach((log) => {
    const message = log.split('] ').at(-1) as string;
    if (!counts[message]) {
      counts[message] = 1;
    } else {
      counts[message]++;
    }
  });

  return Object.entries(counts)
    .map(([message, count]) => ({ message, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 3);
}
