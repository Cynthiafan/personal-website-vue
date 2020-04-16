import DateRangePicker from './DateRangePicker';

export default {
  title: 'Picker',
};

export const DateRange = () => ({
  components: { DateRangePicker },
  template: `
    <DateRangePicker
      :maxRangeLength="365"
      exceedLengthErrorMsg="時間區間不可超過一年"
    ></DateRangePicker>
  `,
});