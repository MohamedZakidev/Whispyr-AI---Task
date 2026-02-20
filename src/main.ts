// import { parsedLogs } from './constants/index';
// import { getCountLogsPerLevel, getMostFrequentErrorMessages, getPeakHour } from './utils';

import { parsedLogs } from './constants';
import {
  findErrorCascades,
  getCountLogsPerLevel,
  getMostFrequentErrorMessages,
  getPeakHour,
  getSessionLogsById,
} from './utils';

console.log(parsedLogs);
console.log(getCountLogsPerLevel(parsedLogs));

console.log(getMostFrequentErrorMessages(parsedLogs));

console.log(getPeakHour(parsedLogs));

console.log(getSessionLogsById('xyz789', parsedLogs));

console.log(findErrorCascades(parsedLogs));
