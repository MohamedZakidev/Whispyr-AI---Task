import { parsedLogs } from './constants';
import {
  findErrorCascades,
  getCountLogsPerLevel,
  getMostFrequentErrorMessages,
  getPeakHour,
  getSessionLogsById,
} from './utils';

console.log(parsedLogs);
console.log('getCountLogsPerLevel:', getCountLogsPerLevel(parsedLogs));

console.log('getMostFrequentErrorMessages:', getMostFrequentErrorMessages(parsedLogs));

console.log('getPeakHour:', getPeakHour(parsedLogs));

console.log('getSessionLogsById', getSessionLogsById('xyz789', parsedLogs));

console.log('findErrorCascades', findErrorCascades(parsedLogs));
