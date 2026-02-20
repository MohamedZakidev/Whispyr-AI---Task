import { logsData } from './constants/index';
import { getCountEnteriesPerLevel, getMostFrequentErrorMessages } from './utils';

console.log(getCountEnteriesPerLevel(logsData));

console.log(getMostFrequentErrorMessages(logsData));
