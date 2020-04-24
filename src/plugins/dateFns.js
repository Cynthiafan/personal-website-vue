import { format, eachDayOfInterval, startOfWeek, endOfWeek, parse } from 'date-fns';
import { enUS, zhTW } from 'date-fns/locale';
import { parse as fpParse, subMonths } from 'date-fns/fp';
import flow from 'lodash/fp/flow';

const locales = { enUS, zhTW };
const language = 'zhTW';

// =========== format ===========

export const dfFormat = (date, formatStr = 'yyyy/M/d') => {
  return format(date, formatStr, {
    locale: locales[language],
    weekStartsOn: 1
  });
};

export const formatToISOWeekday = (weekday) => (weekday === 0 ? 7 : weekday);

// =========== parse ===========
export const dfParse = (parseStr, parseFormat, base = new Date()) => {
  return parse(parseStr, parseFormat, base);
};

export const parseHour = fpParse(new Date(), 'H');
export const parseDate = fpParse(new Date(), 'yyyy/M/d');

// =========== others ===========

export const initWeekdays = (weekStartsOn = 1) => {
  const now = new Date();
  const arr = eachDayOfInterval({ start: startOfWeek(now, { weekStartsOn }), end: endOfWeek(now, { weekStartsOn }) });

  return arr.map(day => dfFormat(day, 'E'));
};