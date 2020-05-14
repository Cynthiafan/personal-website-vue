import { format, eachDayOfInterval, startOfWeek, endOfWeek, parse } from 'date-fns';
import { enUS, zhTW } from 'date-fns/locale';
import { parse as fpParse } from 'date-fns/fp';

const locales = { enUS, zhTW };
const language = 'zhTW';

// =========== format ===========

export const dfFormat = (date: Date, formatStr: string = 'yyyy/M/d') => {
  return format(date, formatStr, {
    locale: locales[language],
    weekStartsOn: 1,
  });
};

export const formatToISOWeekday = (weekday: number): number => (weekday === 0 ? 7 : weekday);

// =========== parse ===========
export const dfParse = (parseStr: string, parseFormat: string, base: Date = new Date()): Date => {
  return parse(parseStr, parseFormat, base);
};

export const parseHour = fpParse(new Date(), 'H');
export const parseDate = fpParse(new Date(), 'yyyy/M/d');

// =========== others ===========

export const initWeekdays = (weekStartsOn: 0 | 2 | 1 | 6 | 5 | 4 | 3 | undefined = 1) => {
  const now = new Date();
  const arr = eachDayOfInterval({ start: startOfWeek(now, { weekStartsOn }), end: endOfWeek(now, { weekStartsOn }) });

  return arr.map((day) => dfFormat(day, 'E'));
};
