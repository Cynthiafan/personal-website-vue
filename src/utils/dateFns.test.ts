import * as df from './dateFns.utils';

describe('date-fns', () => {

  it('format to yyyy/M/d', () => {
    const dateObj = new Date();

    const year = dateObj.getFullYear();
    const month = dateObj.getMonth() + 1;
    const day = dateObj.getDate();

    const defaultFormat = `${year}/${month}/${day}`;

    expect(df.dfFormat(dateObj)).toBe(defaultFormat);
  });

});
