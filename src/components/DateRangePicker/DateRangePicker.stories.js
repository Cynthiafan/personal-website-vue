import { storiesOf } from '@storybook/vue';
import DateRangePicker from './DateRangePicker';
import readme from './README.md';

storiesOf('Picker', module)
  .add('Date Range', () => ({
    components: { DateRangePicker },
    template: `
      <DateRangePicker
        :maxRangeLength="365"
        exceedLengthErrorMsg="時間區間不可超過一年"
      ></DateRangePicker>
    `,
  }), { notes: readme });